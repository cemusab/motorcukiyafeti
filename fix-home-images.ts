import fs from 'fs';

const replacements = {
  'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0352/2048/shoei_rf1400_helmet_black.jpg&w=200&h=200&fit=contain&bg=white': 'https://placehold.co/200x200/ffffff/333333.png?text=Kask',
  'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0369/0713/alpinestars_gp_plus_r_v3_rideknit_leather_jacket_black_white_red.jpg&w=200&h=200&fit=contain&bg=white': 'https://placehold.co/200x200/ffffff/333333.png?text=Mont',
  'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0126/6656/alpinestars_missile_v2_leather_pants.jpg&w=200&h=200&fit=contain&bg=white': 'https://placehold.co/200x200/ffffff/333333.png?text=Pantolon',
  'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0425/0859/alpinestars_sp_8_v3_gloves.jpg&w=200&h=200&fit=contain&bg=white': 'https://placehold.co/200x200/ffffff/333333.png?text=Eldiven',
  'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0177/3494/alpinestars_smx6_v2_vented_boots.jpg&w=200&h=200&fit=contain&bg=white': 'https://placehold.co/200x200/ffffff/333333.png?text=Bot',
  'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0481/3180/cardo_packtalk_edge_headset.jpg&w=200&h=200&fit=contain&bg=white': 'https://placehold.co/200x200/ffffff/333333.png?text=Interkom',
  'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0126/6822/alpinestars_nucleon_kr1_cell_back_protector.jpg&w=200&h=200&fit=contain&bg=white': 'https://placehold.co/200x200/ffffff/333333.png?text=Koruma',
  'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0177/3626/nelson_rigg_stormrider_rain_suit_black.jpg&w=200&h=200&fit=contain&bg=white': 'https://placehold.co/200x200/ffffff/333333.png?text=Yagmurluk'
};

let content = fs.readFileSync('src/app/page.tsx', 'utf-8');
for (const [oldUrl, newUrl] of Object.entries(replacements)) {
  content = content.replace(oldUrl, newUrl);
}
fs.writeFileSync('src/app/page.tsx', content);
