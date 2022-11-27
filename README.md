<center><img src='public/growing.svg' width="200px" /></center>
<br>
<br>

<center>
<h2>✨ 살아있는 문서를 만들어 보자! ✨</h2>
</center>

<br>

# 🚀 Develop

`yarn start`

- http://localhost:3000 에서 개발 진행

`yarn storybook`

- http://localhost:6006 에서 컴포넌트 테스트

<br>
<br>

# 🚀 Git Flow

## 🌱 Branch Name

- master : 제품으로 출시될 수 있는 브랜치
- feat : 기능을 개발하는 브랜치
- release : 이번 출시 버전을 준비하는 브랜치
- hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치

## 🌱 PR

- feat/이슈내용
- fix/이슈내용
- 리뷰어 꼭 설정하기
- 본인 PR은 본인이 merge 하기

<br>

## 🌱 Branch 생성

1. release branch를 최신 상태로 갱신
   - git fetch upstream release-1.0.0
2. release branch를 로컬에 merge
   - git merge upstream/release-1.0.0
3. 본인이 개발할 브랜치 생성 후, 개발 진행
   - git checkout -b feat/기능명
