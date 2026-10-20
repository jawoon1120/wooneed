import { mkdir, copyFile, cp, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const name of ['index.html', 'styles.css', 'script.js']) await copyFile(name, `dist/${name}`);
await cp('assets', 'dist/assets', { recursive: true });
console.log('정적 사이트 빌드 완료: dist/');
