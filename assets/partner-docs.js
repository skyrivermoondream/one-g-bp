// Partner documents (slide 8): page images open in the shared image gallery from fa-preview.js.
(() => {
  const DOCS = {
    zhiye: {
      pages: 24,
      dir: 'assets/partners/zhiye/',
      pdf: 'assets/partners/zhiye/zhiye-company-overview.pdf',
      aspect: 16 / 9,
      title: ['智野智能 · 公司介绍', 'WiseVision Intelligence · Company Deck'],
      caption: ['资料由智野智能提供（公开版，不含融资信息）', 'Supplied by WiseVision Intelligence (public version, financing details omitted)'],
    },
    chongke: {
      pages: 36,
      dir: 'assets/partners/chongke/',
      pdf: 'assets/partners/chongke/chongke-product-manual.pdf',
      aspect: 1406 / 1921,
      title: ['崇科智能 · 产品手册', 'Chongke Intelligence · Product Manual'],
      caption: ['资料由崇科智能提供', 'Supplied by Chongke Intelligence'],
    },
  };
  const gallery = () => document.getElementById('fa-preview');
  const reset = () => {
    const dialog = gallery();
    if (!dialog) return;
    delete dialog.dataset.gallery;
    dialog.style.removeProperty('--doc-aspect');
  };
  document.querySelectorAll('[data-partner-doc]').forEach(button => {
    button.addEventListener('click', () => {
      const doc = DOCS[button.dataset.partnerDoc];
      if (!doc) return;
      const items = Array.from({ length: doc.pages }, (_, i) => ({
        src: `${doc.dir}p${String(i + 1).padStart(2, '0')}.webp`,
        title: doc.title,
        caption: doc.caption,
        href: doc.pdf,
        linkLabel: ['打开 PDF', 'Open PDF'],
      }));
      const dialog = gallery();
      if (dialog) {
        dialog.dataset.gallery = 'partner-doc';
        dialog.style.setProperty('--doc-aspect', String(doc.aspect));
      }
      document.dispatchEvent(new CustomEvent('oneg:image-preview', { detail: { opener: button, index: 0, items } }));
    });
  });
  gallery()?.addEventListener('close', reset);
})();
