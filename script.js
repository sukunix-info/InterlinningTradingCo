/* ==========================================================================
   Interlining Trading Co. (ITC Lion)
   20,000x Supercharged Interactive JavaScript Engine
   Full Authentic Pamphlet Catalog Support (18 Official Products)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Toast Notification Helper
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message, icon = '✓') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color: #22C55E; font-weight: 800;">${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 3500);
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      mobileToggle.innerHTML = isExpanded 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. Live Animated Counter on Scroll / Load
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  let hasAnimatedStats = false;

  function animateStats() {
    if (hasAnimatedStats) return;
    hasAnimatedStats = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const duration = 1800; // ms
      const stepTime = 20;
      const step = Math.ceil(target / (duration / stepTime));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.innerHTML = `${current.toLocaleString()}${suffix}`;
      }, stepTime);
    });
  }

  setTimeout(animateStats, 300);

  // 4. Product Catalog Filter & Live Search System
  const searchInput = document.getElementById('catalogSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  let currentCategory = 'all';

  function applyProductFilters() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    if (clearSearchBtn) {
      clearSearchBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    let matchCount = 0;

    productCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const text = card.textContent.toLowerCase();

      const matchesCat = (currentCategory === 'all' || category === currentCategory);
      const matchesSearch = query === '' || text.includes(query);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        matchCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    const noResultsMsg = document.getElementById('noResultsMsg');
    if (noResultsMsg) {
      noResultsMsg.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      applyProductFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyProductFilters);
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      applyProductFilters();
      searchInput.focus();
    });
  }

  // 5. Interactive Product Quick-View Modal (Complete 18 Authentic Products)
  const productModal = document.getElementById('productQuickModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalTag = document.getElementById('modalTag');
  const modalDesc = document.getElementById('modalDesc');
  const modalImg = document.getElementById('modalImg');
  const modalCompatibility = document.getElementById('modalCompatibility');
  const modalTemp = document.getElementById('modalTemp');
  const modalPack = document.getElementById('modalPack');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

  // Complete Official Pamphlet Product Metadata (All 18 Authentic Products)
  const productData = {
    // Sheet 1 Products
    'front-fusing': {
      title: 'Front Fusing Cotton & Stretch Fusible Interlining',
      tag: 'Pamphlet Product 1 • Core Interlining',
      desc: 'Premium cotton and micro-stretch fusible interlining specially coated for suit fronts, sherwanis, and luxury shirts. Guaranteed no bubble formation and durable bond.',
      image: 'images/prod_front_fusing.png',
      compatibility: 'Cotton, Wool, Linen, Stretch Suiting & Silk Blends',
      temp: '135°C - 150°C (12 - 15 seconds, medium pressure)',
      pack: '50m / 100m Roll (36", 44", 60" Widths)'
    },
    'hair-canvas': {
      title: 'Hair Canvas (Bespoke Suit & Blazer Canvas)',
      tag: 'Pamphlet Product 2 • Coat & Blazer Structure',
      desc: 'Genuine wool and natural horsehair canvas engineered for chest piece and lapel roll structure in formal suits, blazers, tuxedos, and sherwanis.',
      image: 'images/prod_hair_canvas.png',
      compatibility: 'Pure Wool, Cashmere, Heavy Poly-viscose, Terry-wool',
      temp: '140°C - 160°C (Steam press or hand-basting)',
      pack: '30m / 50m Rolls (Standard 60" Width)'
    },
    'ready-chest-piece': {
      title: 'Ready Chest Piece (Pre-Formed Suit Chest Piece)',
      tag: 'Pamphlet Product 3 • Master Tailor Ready-to-Use',
      desc: 'Multi-layer stitched and shaped ready chest pieces saving hours of tailor manual cutting. Provides instant three-dimensional roll to suit lapels.',
      image: 'images/prod_ready_chest_piece.png',
      compatibility: 'Gentlemen Bespoke Suits, Blazers, Tuxedos, Sherwanis',
      temp: 'Pre-shaped, ready for direct basting/insert',
      pack: 'Pairs (Left + Right) / Box of 50 Pairs'
    },
    'ready-sleeve-head': {
      title: 'Ready Sleeve Head (Pre-Formed Sleeve Head Rolls)',
      tag: 'Pamphlet Product 4 • Shoulder Perfection',
      desc: 'Pre-formed bias-cut sleeve head wadding giving clean crown structure to jacket sleeve caps without dimples or fabric collapse.',
      image: 'images/prod_ready_sleeve_head.png',
      compatibility: 'Suit & Blazer Sleeve Heads',
      temp: 'Ready to sew directly into sleeve armhole seam',
      pack: 'Roll of 50 Meters / Pre-cut Pairs Bundle'
    },
    'shoulder-pads': {
      title: 'Shoulder Pads (Coat, Blazer & Sherwani Pads)',
      tag: 'Pamphlet Product 5 • Structural Comfort',
      desc: 'Graded needle-punched felt and foam shoulder pads with molded crown for sharp, comfortable shoulder silhouette on suits, blazers, and indowesterns.',
      image: 'images/prod_shoulder_pads.png',
      compatibility: 'Men & Women Suits, Blazers, Overcoats, Kurtas',
      temp: 'Dry-clean and steam safe',
      pack: 'Pairs / Master Bag of 100 Pairs'
    },
    'polyester-lining': {
      title: 'Polyester Lining (Football, Moon, Embossed, Print, Semi Satin, Satin, Jacquard, Sleeve Lining)',
      tag: 'Pamphlet Product 6 • Complete Lining Range',
      desc: 'Full selection of premium inner linings including Football texture, Moon finish, Embossed patterns, Designer Digital Prints, Semi-Satin, Ultra Lustrous Satin, Jacquard Weaves, and Striped Sleeve Linings.',
      image: 'images/prod_polyester_lining.png',
      compatibility: 'Blazers, Suits, Sherwanis, Jackets, Gowns, Kurtis',
      temp: 'Anti-static, breathable, colorfast under wash/dry-clean',
      pack: 'Thaan Rolls (50m / 100m) - 50+ Shade Options'
    },
    'tape-roll': {
      title: 'Tape Roll Single Side & Double Side Fusible',
      tag: 'Pamphlet Product 7 • Stay & Hemming Tapes',
      desc: 'Precision pre-slit single-sided and double-sided fusible tape rolls for lapel edge stay, armhole stabilization, trouser hem bonding, and pocket reinforcement.',
      image: 'images/prod_tape_roll.png',
      compatibility: 'All shirting, suiting, and ladies wear edge work',
      temp: '130°C - 145°C (8 - 10 seconds)',
      pack: 'Widths: 10mm, 12mm, 15mm, 20mm, 25mm (50m Roll)'
    },
    'buttons': {
      title: 'Buttons (Blazer, Suit, Formal Horn & Metal Crest)',
      tag: 'Pamphlet Product 8 • Buttons Collection',
      desc: 'Extensive card assortments of genuine horn look buttons, antique brass crest blazer buttons, tuxedo satin buttons, and shirt cuff buttons.',
      image: 'images/prod_buttons.png',
      compatibility: 'Suits, Blazers, Safari Suits, Formal Shirts, Kurtas',
      temp: 'Heat resistant & dry-clean safe',
      pack: '1 Gross (144 pcs) / Sample Cards / Master Box'
    },
    'coat-hanger': {
      title: 'Heavy Coat Hanger (Curved Wide Shoulder Hanger)',
      tag: 'Pamphlet Product 9 • Garment Display & Care',
      desc: 'Heavy-duty contoured black plastic coat hangers with wide shoulder flares and non-slip trouser crossbar. Preserves shoulder shape and prevents sagging.',
      image: 'images/prod_coat_hanger.png',
      compatibility: 'Suits, Blazers, Sherwanis, Winter Jackets',
      temp: 'High-impact virgin grade durable plastic',
      pack: 'Carton of 50 Pcs / 100 Pcs Wholesale'
    },
    'suit-cover': {
      title: 'Suit / Sherwani / Indowestern Cover (Garment Bags)',
      tag: 'Pamphlet Product 10 • Dustproof Travel Bags',
      desc: 'High-grade non-woven and waterproof fabric suit covers with heavy zipper, transparent window, and dual carrying handles. Customized printing available for shops.',
      image: 'images/prod_suit_cover.png',
      compatibility: 'Bespoke Suits, Sherwanis, Indowestern, Bridal Gowns',
      temp: 'Breathable, moisture-proof, reusable',
      pack: 'Bundle of 25 / 50 / 100 Pcs'
    },

    // Sheet 2 Products
    'diecut-collar': {
      title: 'Diecut Collar (Ready Pre-Cut Shirt Collar Fusing)',
      tag: 'Pamphlet Product 11 • Shirt Making Precision',
      desc: 'Precision die-cut shirt collar fusing blanks ensuring identical point symmetry on every single shirt collar. High-heat adhesive with zero bubbling.',
      image: 'images/prod_diecut_collar.png',
      compatibility: 'Formal Shirts, Casual Shirts, Designer Kurtas',
      temp: '140°C - 150°C (12 - 14 seconds)',
      pack: 'Packet of 100 Pcs / Box (Sizes: 14" to 18")'
    },
    'diecut-cuff': {
      title: 'Diecut Cuff (Ready Pre-Cut Shirt Cuff Fusing)',
      tag: 'Pamphlet Product 12 • Crisp Shirt Cuffs',
      desc: 'Pre-cut fusible cuff interlining blanks available in square cut, round cut, and french cuff styles. Saves substantial tailor cutting time.',
      image: 'images/prod_diecut_cuff.png',
      compatibility: 'Men and Women Shirt Sleeves',
      temp: '140°C - 150°C (12 - 14 seconds)',
      pack: 'Packet of 100 Pairs / Master Carton'
    },
    'shirt-front-patti': {
      title: 'Shirt Frunt Patti Roll (Placket Fusing Roll)',
      tag: 'Pamphlet Product 13 • Straight Placket Roll',
      desc: 'Pre-slit continuous fusible interlining tape roll for shirt front button plackets (Patti). Ensures perfectly straight, crisp front edges.',
      image: 'images/prod_shirt_front_patti.png',
      compatibility: 'Shirt Front Patti, Kurta Plackets, Chikan Kurtas',
      temp: '135°C - 145°C (10 - 12 seconds)',
      pack: 'Standard 1" / 1.25" / 1.5" Widths (100m Roll)'
    },
    'fusible-waist-band': {
      title: 'Fusible Waist Band Roll (Pant & Trouser Canvas)',
      tag: 'Pamphlet Product 14 • Trouser Canvas Roll',
      desc: 'Rigid and stretch-resistant fusible waistband interlining roll specifically engineered for formal trouser and pant waists. Prevents roll-over.',
      image: 'images/prod_fusible_waistband.png',
      compatibility: 'Men & Women Formal Trousers, Chinos, Uniform Pants',
      temp: '140°C - 150°C (12 - 15 seconds)',
      pack: 'Standard Widths: 1.25", 1.5", 2" (50m / 100m Roll)'
    },
    'gripper-waist-band': {
      title: 'Gripper & Waist Band (Anti-Slip Trouser Band)',
      tag: 'Pamphlet Product 15 • Luxury Trouser Gripper',
      desc: 'High-end trouser inner waistband featuring continuous silicone/rubber gripper stripes that grip tucked-in shirts, keeping shirts neat all day long.',
      image: 'images/prod_gripper_waistband.png',
      compatibility: 'Executive Suits, Bespoke Trousers, Formal Uniforms',
      temp: 'Pre-sewn waistband trim ready to stitch',
      pack: '50 Meter Continuous Roll (Black & White with Red/Blue Accent Lines)'
    },
    'trousers-hook': {
      title: 'Trousers Hook (Heavy-Duty Pant Hooks & Bars)',
      tag: 'Pamphlet Product 16 • Brass & Nickel Hooks',
      desc: 'Premium rust-proof stamped steel and brass trouser hooks, bars, and eyelets with ultra-firm grip for daily wear pants and trousers.',
      image: 'images/prod_trousers_hook.png',
      compatibility: 'Trousers, Pants, Skirts, Uniforms',
      temp: 'Tested to withstand 25+ kg pulling force',
      pack: 'Box of 1 Gross (144 Sets) / Master Pack'
    },
    'zipper': {
      title: 'Zipper (Concealed Invisible, Nylon Coil & Brass Metal)',
      tag: 'Pamphlet Product 17 • Premium Fasteners',
      desc: 'Complete range of ultra-smooth zippers: Invisible concealed zippers for ladies gowns & kurtis, brass metal teeth zippers for jeans & trousers, and nylon coil zippers.',
      image: 'images/prod_zipper.png',
      compatibility: 'Pants, Gowns, Dresses, Jackets, Pockets',
      temp: 'Tested for 10,000+ open-close cycles with zero jam',
      pack: 'Pack of 12 (1 Dozen) / 50 Pcs Bundle / Bulk Box'
    },
    'thread': {
      title: 'Thread (Industrial Spun Poly Sewing Threads)',
      tag: 'Pamphlet Product 18 • High-Tenacity Thread',
      desc: 'Top-grade spun polyester sewing thread with silicone lubrication for flawless high-speed machine stitching without thread breakage or lint buildup.',
      image: 'images/prod_thread.png',
      compatibility: 'All standard garments, shirts, trousers, suits & embroidery',
      temp: '100% colorfast under industrial washing & hot ironing',
      pack: 'Box of 10 Cones (1000m / 5000m Cones) - 500+ Shades'
    }
  };

  // Open modal on click
  document.querySelectorAll('.open-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-product-key');
      const data = productData[key];

      if (data && productModal) {
        modalTitle.textContent = data.title;
        modalTag.textContent = data.tag;
        modalDesc.textContent = data.desc;
        modalImg.src = data.image;
        modalCompatibility.textContent = data.compatibility;
        modalTemp.textContent = data.temp;
        modalPack.textContent = data.pack;

        const whatsappMsg = `Hello Asif Bhai & Afaz Bhai (Interlining Trading Co.),\nI am inquiring about *${data.title}* from your official pamphlet catalog.\nPlease share current wholesale rates and available stock.`;
        modalWhatsappBtn.href = `https://wa.me/919327025113?text=${encodeURIComponent(whatsappMsg)}`;

        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (productModal) {
      productModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 6. Interactive FAQ Accordion
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const question = card.querySelector('.faq-question');
    const answer = card.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = card.classList.contains('active');

        faqCards.forEach(c => {
          c.classList.remove('active');
          const a = c.querySelector('.faq-answer');
          if (a) a.style.maxHeight = null;
        });

        if (!isActive) {
          card.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // 7. Wholesale Order / Inquiry Builder (Live Calculator with Pamphlet Items)
  const orderCheckboxes = document.querySelectorAll('.material-chk');
  const customShopName = document.getElementById('customShopName');
  const customCity = document.getElementById('customCity');
  const customNote = document.getElementById('customNote');
  const previewBox = document.getElementById('inquiryPreview');
  const sendOrderWhatsappBtn = document.getElementById('sendOrderWhatsappBtn');

  function updateOrderPreview() {
    let selectedItems = [];

    document.querySelectorAll('.material-chk').forEach(chk => {
      const parentRow = chk.closest('.material-checkbox-item');
      const qtyInput = parentRow.querySelector('.item-qty-input');

      if (chk.checked) {
        parentRow.classList.add('checked');
        const itemName = chk.getAttribute('data-name');
        const itemUnit = chk.getAttribute('data-unit') || 'Units';
        const qtyVal = qtyInput ? qtyInput.value : 1;
        selectedItems.push(`- ${itemName}: ${qtyVal} ${itemUnit}`);
      } else {
        parentRow.classList.remove('checked');
      }
    });

    const shop = customShopName && customShopName.value.trim() ? customShopName.value.trim() : '[તમારી દુકાન / Shop Name]';
    const city = customCity && customCity.value.trim() ? customCity.value.trim() : 'Ahmedabad / Gujarat';
    const note = customNote && customNote.value.trim() ? customNote.value.trim() : '';

    let messageText = `*Official Catalog Wholesale Inquiry - Interlining Trading Co.*\n`;
    messageText += `Shop / Client: ${shop}\n`;
    messageText += `City / Area: ${city}\n\n`;
    messageText += `*Selected Materials Requirements:*\n`;

    if (selectedItems.length > 0) {
      messageText += selectedItems.join('\n');
    } else {
      messageText += `(કૃપા કરીને ઉપરથી મટીરીયલ સિલેક્ટ કરો / Please select items)`;
    }

    if (note) {
      messageText += `\n\n*Special Note:* ${note}`;
    }

    messageText += `\n\nPlease share wholesale rates & immediate dispatch availability.`;

    if (previewBox) {
      previewBox.textContent = messageText;
    }

    return messageText;
  }

  document.querySelectorAll('.material-chk').forEach(chk => {
    chk.addEventListener('change', updateOrderPreview);
    const parentRow = chk.closest('.material-checkbox-item');
    const qtyInput = parentRow.querySelector('.item-qty-input');
    if (qtyInput) {
      qtyInput.addEventListener('input', () => {
        if (!chk.checked) chk.checked = true;
        updateOrderPreview();
      });
    }
  });

  if (customShopName) customShopName.addEventListener('input', updateOrderPreview);
  if (customCity) customCity.addEventListener('input', updateOrderPreview);
  if (customNote) customNote.addEventListener('input', updateOrderPreview);

  updateOrderPreview();

  if (sendOrderWhatsappBtn) {
    sendOrderWhatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = updateOrderPreview();
      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/919327025113?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
      showToast('Opening WhatsApp with your inquiry list!', '📱');
    });
  }

  // 8. 1-Click WhatsApp on Product Cards
  document.querySelectorAll('.product-whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = btn.getAttribute('data-product') || 'Tailoring Material';
      const defaultText = `Hello Asif Bhai & Afaz Bhai (Interlining Trading Co.),\nI want wholesale rate & availability inquiry for: *${productName}* from your catalog.`;
      const encoded = encodeURIComponent(defaultText);
      window.open(`https://wa.me/919327025113?text=${encoded}`, '_blank');
      showToast(`Inquiring about ${productName} on WhatsApp`, '💬');
    });
  });

  // 9. Copy-to-Clipboard with Toast Notification
  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Text';

      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`${label} copied to clipboard!`, '📋');
        }).catch(() => {
          fallbackCopy(textToCopy, label);
        });
      } else if (textToCopy) {
        fallbackCopy(textToCopy, label);
      }
    });
  });

  function fallbackCopy(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(`${label} copied!`, '📋');
  }

  // 10. 1-Click vCard Generator (Save Asif & Afaz Mansuri Contact)
  const saveVcardBtn = document.getElementById('saveVcardBtn');
  if (saveVcardBtn) {
    saveVcardBtn.addEventListener('click', () => {
      const vcardData = 
`BEGIN:VCARD
VERSION:3.0
N:Mansuri;Asif & Afaz;;;
FN:Asif Mansuri & Afaz Mansuri (Interlining Trading Co.)
ORG:Interlining Trading Co.
TITLE:Tailoring & Garment Material Shop
TEL;TYPE=CELL,VOICE:+919327025113
TEL;TYPE=WORK,VOICE:+919099925113
TEL;TYPE=MAIN,VOICE:+919157725113
EMAIL:itco.asif@gmail.com
ADR;TYPE=WORK:;;Shop: 3, Mahaveer Chambers, Opp. Royal Stores, Salapas Road, Relief Road;Ahmedabad;Gujarat;380001;India
ADR;TYPE=HOME:;;LL-No.2, Maharaja Complex, Nr. Relief Cinema, Relief Road;Ahmedabad;Gujarat;380001;India
NOTE:Wholesale & Retail supplier of interlining, diecut collar, cuff, shoulder pads, chest piece, canvas, threads, buttons & covers.
URL:https://itco-ahmedabad.com
END:VCARD`;

      const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.setAttribute('download', 'Interlining_Trading_Co_Asif_Afaz_Mansuri.vcf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      showToast('Contact saved with Asif & Afaz Mansuri! (.vcf)', '📇');
    });
  }

  // 11. Contact Form Submission via WhatsApp
  const contactForm = document.getElementById('contactInquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const type = document.getElementById('formBizType').value;
      const message = document.getElementById('formMsg').value.trim();

      const text = `*New Website Inquiry - Interlining Trading Co.*\nName: ${name}\nPhone: ${phone}\nBusiness Type: ${type}\nMessage: ${message}`;
      const url = `https://wa.me/919327025113?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
      showToast('Opening WhatsApp to send your inquiry...', '🚀');
    });
  }
});
