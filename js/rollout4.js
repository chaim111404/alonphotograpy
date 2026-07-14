const fs = require('fs');
let miss = 0;
function rep(file, from, to, all) {
  let s = fs.readFileSync(file, 'utf8');
  const n = s.split(from).length - 1;
  if (n === 0) { console.log(`  [MISS] ${file}: ${from.slice(0,42)}`); miss++; return; }
  s = s.split(from).join(to);
  fs.writeFileSync(file, s);
  console.log(`  [OK${all ? ' x'+n : ''}] ${file}: ${to.slice(0,38)}`);
}

// INDEX — review modal (static + JS-rendered)
rep('index.html', 'השאר ביקורת</h3>', 'כתיבת ביקורת</h3>', true);
rep('index.html', 'placeholder="השם שלך *"', 'placeholder="השם שלך"', true);
rep('index.html', 'placeholder="ספר על החוויה שלך *"', 'placeholder="כמה מילים על החוויה"', true);
rep('index.html', '>שלח ביקורת</span>', '>שליחת ביקורת</span>');
rep('index.html', '>שלח ביקורת</button>', '>שליחת ביקורת</button>');
rep('index.html', "btn.innerHTML = 'שלח ביקורת';", "btn.innerHTML = 'שליחת ביקורת';");

// CONTACT — success state (JS)
rep('contact.html', 'תודה ${name}!<br>קיבלתי את פנייתך ואחזור אליך תוך 24 שעות.', 'תודה ${name}! קיבלתי. אחזור עם הצעה תוך 24 שעות.');
rep('contact.html', '>צפה בגלריה</a>', '>לגלריה</a>');
rep('contact.html', '>חזור לבית</a>', '>לעמוד הבית</a>');

console.log('\nmisses:', miss);
process.exit(miss ? 1 : 0);
