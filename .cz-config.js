const typeEnums = {
  '✨ feat': '새로운 기능 추가',
  '🐛 fix': '버그 해결 / 수정',
  '📝 docs': '문서 추가 또는 수정',
  '🎨 style': '코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등)',
  '💄 design': '사용자 UI 디자인 변경 (CSS 등)',
  '♻️ refactor': '리팩토링',
  '🧪 test': '테스트 코드, 리팩토링 (Test Code)',
  '👷 build': '빌드 파일 수정',
  '💚 ci': 'CI 구성 파일 및 스크립트 변경',
  '⚡️ perf': '성능 개선',
  '💡 comment': '필요한 주석 추가 및 변경',
  '🔧 chore': '자잘한 수정이나 빌드 업데이트',
  '🚚 rename': '파일 혹은 폴더명을 수정만 한 경우',
  '🔥 remove': '파일을 삭제만 한 경우',
};

const maxSpaceLength = Object.keys(typeEnums).reduce(
  (acc, { length }) => (length > acc ? length : acc),
  0
);

const commitizenConfig = {
  types: Object.entries(typeEnums).map(([type, description]) => ({
    value: type,
    name: `${type}: ${' '.repeat(maxSpaceLength - type.length)}` + description,
  })),
  skipQuestions: ['footer'],
  skipEmptyScopes: true,
};

module.exports = commitizenConfig;
