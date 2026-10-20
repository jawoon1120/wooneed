// 확인된 연락처와 사업자 정보만 입력해 주세요. 비어 있으면 준비 중 안내를 표시합니다.
const company = {
  email: '',
  legalName: '',
  representative: '',
  businessNumber: '',
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

const scenes = {
  privacy: { time: '00:12', label: '개인정보 확인 후보', text: '인물이 포함된 구간을 확인하고, 공개 전 동의 여부와 가림 처리 필요성을 검토해 주세요.', position: 'privacy', progress: '12%' },
  restriction: { time: '00:48', label: '촬영·출입 제한 안내 확인', text: '촬영 장소의 안내문에 제한 사항이 있는지 살펴보는 기능의 예시입니다. 실제 안내 내용과 적용 범위는 직접 확인해 주세요.', position: 'restriction', progress: '39%' },
  source: { time: '01:26', label: '공식 자료와 함께 검토', text: '분석 결과와 관련된 공식 자료를 함께 확인하는 기능의 예시입니다. 실제 자료 링크는 서비스에서 제공할 예정입니다.', position: 'source', progress: '67%' },
};
document.querySelectorAll('[data-scene]').forEach(button => {
  button.addEventListener('click', () => {
    const scene = scenes[button.dataset.scene];
    document.querySelectorAll('[data-scene]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelector('#video-time').textContent = `${scene.time} / 02:34`;
    document.querySelector('#detection-label').textContent = scene.label;
    document.querySelector('#detail-text').textContent = scene.text;
    document.querySelector('#detection-box').className = `detection-box ${scene.position}`;
    document.querySelector('#playhead').style.left = scene.progress;
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
if (company.email) {
  const container = document.querySelector('#contact-action');
  container.className = 'contact-email';
  const link = document.createElement('a');
  link.href = `mailto:${company.email}`;
  link.textContent = `${company.email} ↗`;
  container.replaceChildren(link);
}
const business = [company.legalName && `사업자명 ${company.legalName}`, company.representative && `대표 ${company.representative}`, company.businessNumber && `사업자등록번호 ${company.businessNumber}`].filter(Boolean);
if (business.length) {
  const info = document.querySelector('#company-info');
  info.textContent = business.join(' · ');
  info.hidden = false;
}
