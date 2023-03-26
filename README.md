<img src='https://growing-pets.s3.ap-northeast-2.amazonaws.com/info/info.png' />
<br>
<br>

# 커플 통합 앱 서비스 "그로잉"

“커플들이 함께 추억을 만들고 저장하며 공유할 수 있는 통합 서비스가 없을까?”

이 생각에서 출발한 그로잉은, 커플 통합 앱 서비스입니다. 어플 내에서 그로잉펫을 함께 키우며 서로의 관계를 성장시키는 것을 목표로 하고 있습니다.

그로잉은 다양한 기능들로 구성되어 있습니다. 커플들이 함께한 소중한 순간을 간직하고 공유할 수 있는 <span style="color:#F38181">갤러리 기능</span>, 두 사람이 함께할 때 필요한 계획을 쉽게 조율할 수 있는 <span style="color:#F38181">캘린더 기능</span>, 서로의 생각과 의견을 공유하고 서로에게 질문하고 답변할 수 있는 <span style="color:#F38181">Q&A 기능</span>, 그리고 두 사람이 쉽게 소통할 수 있는 <span style="color:#F38181">채팅 기능</span> 등이 제공됩니다.

그로잉을 통해 커플들은 서로의 관계를 더욱 특별하고 의미있게 만들어 나갈 수 있습니다. 소중한 순간을 기록하고 공유하며, 서로의 생각과 의견을 나누며, 함께 그로잉펫을 키우며 더욱 가까워질 수 있는 그로잉에서 함께해보세요.

<br>
<br />

---

## 🪴 Authors

<table class="tg">
<tbody>
    <tr>
        <td>조연주</td>
        <td>김민지</td>
        <td>김동욱</td>
        <td>박혜빈</td>
        <td>김가영</td>
    </tr>
    <tr>
        <td>FE Developer</td>
        <td>FE Developer</td>
        <td>BE Developer</td>
        <td>기획자</td>
        <td>캐릭터 디자이너</td>
    </tr>
      <tr>
        <td>홈, 채팅, 로그인 기능 구현</td>
        <td>갤러리, 캘린더 기능 구현</td>
        <td>백엔드 설계</td>
        <td>기획 및 마케팅</td>
        <td>3D Modeling</td>
    </tr>
     <tr>
        <td>기획 및 디자인</td>
        <td></td>
        <td>기획 및 운영</td>
        <td></td>
        <td></td>
    </tr>
        <tr>
        <td><a href="https://github.com/yeonju0110">@yeonju0110</a></td>
        <td><a href="https://github.com/metamoong">@metamoong</a></td>
        <td><a href="https://github.com/DONGUKwillsucceed">@DONGUKwillsucceed</a></td>
        <td></td>
        <td></td>
    </tr>
</tbody>
</table>

<br />
<br />

## 🪴 Getting Started

```bash
# 로컬 환경에 다운받기
git clone https://github.com/teamGrowing/growing-web.git

# 패키지 설치
yarn

# 실행하기
yarn start

# 스토리북 실행하기
yarn storybook
```

- 개발 서버: http://localhost:3000
- 스토리북 서버: http://localhost:6006

<br>
<br>

## 🪴 사용 기술

### 📑 Front-end

- React, Typescript, Styled-component
- react-query, mobX
- react-hook-form & yup
- storybook
- swiper, react-full-callendar
- AWS S3, Cloud Front

### 📑 Back-end

- Nest.Js, TypeScript
- MySQL (RDS), Prisma
- AWS EC2

<br />
<br />

## 🪴 서비스 구조

<div align='center'><img src='https://growing-pets.s3.ap-northeast-2.amazonaws.com/info/architecture.png' width='600px' /></div>

<br />
<br />

## 🪴 요구사항 명세서 제작

<div align='center'><img src='https://growing-pets.s3.ap-northeast-2.amazonaws.com/info/specification.png' width='600px' /></div>

<br />
<br />

## 🪴 Design

- figma를 활용하여 디자인 시스템 및 앱 전체 디자인 제작
<div align='center'><img src='https://growing-pets.s3.ap-northeast-2.amazonaws.com/info/design.png' width='600px' /></div>

<br />
<br />

## 🪴 DTO 정의

- 요구사항 명세서와 노션을 활용하여 DTO 정의
<div align='center'><img src='https://growing-pets.s3.ap-northeast-2.amazonaws.com/info/dto.png' width='600px' /></div>

<br />
<br />

## 🪴 API 명세서

- [swagger 문서 이용](http://43.200.173.179:3000/api-docs)

<br />
<br />

## 🪴 FE Team Convention

### 🌱 Branch Name

- `master` : 제품으로 출시될 수 있는 브랜치
- `feat` : 기능을 개발하는 브랜치
- `release` : 이번 출시 버전을 준비하는 브랜치
- `hotfix` : 출시 버전에서 발생한 버그를 수정 하는 브랜치

### 🌱 PR

- feat/이슈내용
- fix/이슈내용
- 리뷰어 꼭 설정하기
- 본인 PR은 본인이 merge 하기

<br>

### 🌱 Branch 생성 전략

1. release branch를 최신 상태로 갱신
   - git fetch upstream release-1.0.0
2. release branch를 로컬에 merge
   - git merge upstream/release-1.0.0
3. 본인이 개발할 브랜치 생성 후, 개발 진행
   - git checkout -b feat/기능명
