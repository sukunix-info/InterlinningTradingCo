Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\admin\Desktop\saad\images\itc_lion_logo.png"
$backupPath = "c:\Users\admin\Desktop\saad\images\itc_lion_logo_orig.png"

if (-not (Test-Path $backupPath)) {
    Copy-Item $srcPath $backupPath
}

$bmp = [System.Drawing.Bitmap]::FromFile($backupPath)
$w = $bmp.Width
$h = $bmp.Height

# Step 1: Find connected exterior background using BFS from edges
$isExterior = New-Object 'bool[,]' $w, $h
$queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

# Push all boundary pixels that are white/near-white (R>230, G>230, B>230)
for ($x=0; $x -lt $w; $x++) {
    $p1 = $bmp.GetPixel($x, 0)
    if ($p1.R -gt 230 -and $p1.G -gt 230 -and $p1.B -gt 230) {
        $isExterior[$x, 0] = $true
        $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
    }
    $p2 = $bmp.GetPixel($x, $h - 1)
    if ($p2.R -gt 230 -and $p2.G -gt 230 -and $p2.B -gt 230) {
        $isExterior[$x, $h - 1] = $true
        $queue.Enqueue((New-Object System.Drawing.Point($x, $h - 1)))
    }
}

for ($y=0; $y -lt $h; $y++) {
    $p1 = $bmp.GetPixel(0, $y)
    if (-not $isExterior[0, $y] -and $p1.R -gt 230 -and $p1.G -gt 230 -and $p1.B -gt 230) {
        $isExterior[0, $y] = $true
        $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
    }
    $p2 = $bmp.GetPixel($w - 1, $y)
    if (-not $isExterior[$w - 1, $y] -and $p2.R -gt 230 -and $p2.G -gt 230 -and $p2.B -gt 230) {
        $isExterior[$w - 1, $y] = $true
        $queue.Enqueue((New-Object System.Drawing.Point($w - 1, $y)))
    }
}

# BFS expansion
$dx = @(1, -1, 0, 0)
$dy = @(0, 0, 1, -1)

while ($queue.Count -gt 0) {
    $curr = $queue.Dequeue()
    for ($i=0; $i -lt 4; $i++) {
        $nx = $curr.X + $dx[$i]
        $ny = $curr.Y + $dy[$i]
        if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
            if (-not $isExterior[$nx, $ny]) {
                $p = $bmp.GetPixel($nx, $ny)
                # If near white background, mark exterior
                if ($p.R -gt 225 -and $p.G -gt 225 -and $p.B -gt 225) {
                    $isExterior[$nx, $ny] = $true
                    $queue.Enqueue((New-Object System.Drawing.Point($nx, $ny)))
                }
            }
        }
    }
}

# Step 2: Bounding box of non-exterior
$minX = $w; $minY = $h; $maxX = 0; $maxY = 0
for ($y=0; $y -lt $h; $y++) {
    for ($x=0; $x -lt $w; $x++) {
        if (-not $isExterior[$x, $y]) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$pad = 12
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + ($pad * 2))

Write-Output "Cropping to: X=$cropX, Y=$cropY, W=$cropW, H=$cropH"

# Step 3: Create 32-bit ARGB image with smooth alpha blending for exterior edges
$outBmp = New-Object System.Drawing.Bitmap $cropW, $cropH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($cy=0; $cy -lt $cropH; $cy++) {
    $sy = $cropY + $cy
    for ($cx=0; $cx -lt $cropW; $cx++) {
        $sx = $cropX + $cx
        if ($sx -ge 0 -and $sx -lt $w -and $sy -ge 0 -and $sy -lt $h) {
            $p = $bmp.GetPixel($sx, $sy)
            if ($isExterior[$sx, $sy]) {
                # Transparent
                $outBmp.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                # Check if it is near boundary to anti-alias smoothly
                $brightness = ($p.R + $p.G + $p.B) / 3.0
                if ($brightness -gt 240) {
                    $alpha = [int][Math]::Max(0, [Math]::Min(255, (255 - $brightness) * 16))
                    $outBmp.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
                } else {
                    $outBmp.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
                }
            }
        }
    }
}

$bmp.Dispose()
$outBmp.Save($srcPath, [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()
Write-Output "Successfully saved transparent trimmed logo to $srcPath"
