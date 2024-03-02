export const MENT_COMMON = Object.freeze({
  RETRY: '다시 시도하기',
  ERROR: '일시적인 오류로 불러오지 못했어요.',
});

const MENT_HOME = Object.freeze({
  PET_NAMING: '그로잉 펫의\n새로운 이름을 지어주세요!',
  PET_NAMING_HELP:
    '잠깐! 이름은 추후에 수정할 수 없으니\n연인과 상의 후, 신중하게 정해주세요 🚨',
  PET_NAMING_SUCCESS: '그로잉펫에게 새 이름이 생겼어요 ! 🥳',
  PET_NAMIMG_FAIL: '앗!\n이미 당신의 연인이\n그로잉펫의 이름을 지어주었어요!',

  PET_FEED: '즐거운 식사시간이에요 🍽️',
  PET_FEED_HELP: '그로잉펫을 탭하여 게이지를 채워주세요!',
  PET_FEED_TIP:
    '그로잉펫은 아침, 저녁 “두끼”만 식사를 해요!\n\n만약 같은 시간에 중복하여 두 분 다 밥을 주신 경우,\n그로잉펫이 배불러서 좋아하지 않을거에요 😢\n꼭! 서로 확인한 후에 밥을 주도록 해요 ㅎㅎ\n\n아침식사는 6~13시, 저녁식사는 17~24시랍니다~',
  PET_FEED_SUCCESS: '그로잉펫이 맛있게 식사를\n완료했어요 ☺️',
  PET_FEED_FAIL_NUMBER: '그로잉펫이 너무 많이 먹어서\n배탈이 난 모양이에요 🤢',
  PET_FEED_FAIL_TIME: '그로잉펫이 배가 고프지 않았던\n모양이에요 😭',

  PET_PLAY: '그로잉펫이랑 놀아주세요 ⚽️',
  PET_PLAY_TIP:
    '그로잉펫은 하루에 2번 놀아주는 걸로 충분히 만족한답니다~\n\n앗! 만약 앱을 자주 방문해준다면, 그로잉펫이\n좋아할지도 몰라요 😉',
  PET_PLAY_SUCCESS: '그로잉펫이 행복해 보여요 😍',
  PET_PLAY_FAIL: '그로잉펫이 살짝 귀찮대요 😅',

  PET_RAISING_FAIL:
    '네트워크 오류가 발생했어요. 이용에 불편을 드려서 죄송해요 😭',

  PET_GRADUATE:
    '아쉽게도 그로잉펫과 헤어질 시간이에요 😭\n그로잉펫이 덕분에 너~~무 행복했대요!\n\n그로잉펫이 그리울 땐 졸업앨범을 찾아주세요ㅎㅎ\n\n그럼 안녕~~👋',
  PET_GRADUATE_NEW_PET: '새로운 그로잉펫 만나러 가기 ✨',
});

export const MENT_CHAT = Object.freeze({
  QNA_EMPTY: '아직 도착한 질문이 없어요.',
  QNA_NOT_PARTER: '상대방이 아직 답변을 하지 않았어요!',
  QNA_NOT_ME: '상대방이 답변을 애타게 기다리고 있어요 ㅠ.ㅠ',
  QNA_SUCCESS: '답변이 등록되었어요!',
  QNA_FAIL: '답변 등록에 실패했어요. 이용에 불편을 드려 죄송해요 😭',
  ARCHIVED_SUCCESS: '채팅이 보관되었어요!',
  ARCHIVED_DELELE:
    '보관된 대화를 삭제하시겠습니까?\n\n대화 보관함에서만 삭제되며,\n채팅방에는 그대로 존재합니다.',
  ARCHIVED_EMPTY: '아직 보관된 대화가 없어요.',
  PHOTOBOX_DELETE:
    '삭제하시겠습니까?\n\n상대방과의 채팅창에서도 전부 삭제됩니다.',
  COPY: '채팅이 복사되었어요!',
});

export const MENT_GALLERY = Object.freeze({
  PHOTO_DELETE_SUCCESS: '삭제되었습니다.',
  PHOTO_DELETE_FAIL_NO_SELECTED: '삭제할 사진을 선택해주세요.',
  PHOTO_DELETE_CONFIRM: '삭제하시겠습니까?',
  PHOTO_DELETE_FAIL: '사진 삭제에 실패했어요.',
  PHOTO_DELETE_DESCRIPTION: '해당 파일을 영구적으로 삭제합니다.',
  PHOTO_DELETE_FROM_ALBUM_CONFIRM: '사진이 앨범에서 제거됩니다.',
  PHOTO_DELETE_FROM_ALBUM_SUCCESS: '사진이 제거되었습니다.',
  PHOTO_UPLOAD_SUCCESS: '사진이 업로드 되었습니다.',
  PHOTO_UPLOAD_FAIL: '사진을 업로드하는 데 실패했습니다.',
  ALBUM_PHOTO_DELETE_SUCCESS: '사진이 앨범에서 제거되었습니다.',
  ALBUM_CHOOSE_DELETE_OPTION:
    '해당 파일을 앨범에서 제거하시겠습니까, 영구 삭제하시겠습니까?',
  ALBUM_MODIFY: '앨범 이름이 변경되었습니다.',
  ALBUM_MODIFY_FAIL: '앨범 이름 수정에 실패했어요.',
  ALBUM_DELETE_CONFIRM: '앨범을 삭제하시겠습니까?',
  ALBUM_DELETE_SUCCESS: '앨범 삭제가 완료되었습니다.',
  ALBUM_DELETE_FAIL: '앨범 삭제에 실패했어요.',
  ALBUM_DELETE_FAIL_NO_SELECTED: '삭제할 앨범을 선택해주세요',
  ALBUM_CREATE_SUCCESS: '앨범 생성이 완료되었습니다.',
  ALBUM_CREATE_FAIL_NO_SELECTED: '앨범을 만들기 위한 사진을 선택해주세요',
  COMMENT_LOAD_FAIL: '댓글을 불러오지 못했어요',
  COMMENT_DELETE_SUCCESS: '댓글이 삭제되었습니다.',
  COMMENT_DELETE_FAIL: '댓글 삭제에 실패했어요.',
  COMMENT_POST_FAIL: '댓글 생성에 실패했어요.',
  ALBUM_EMPTY: '앨범이 없습니다.',
  ALBUM_LOAD_FAIL: '앨범을 불러오지 못했어요.',
});

export const MENT_CALENDAR = Object.freeze({
  PLAN_ADD_SUCCESS: '일정이 추가되었습니다.',
  PLAN_ADD_FAIL: '일청 추가에 실패했어요.',
  PLAN_MODIFY_SUCCESS: '일정이 수정되었습니다.',
  PLAN_MODIFY_FAIL: '일정 수정에 실패했어요.',
  PLAN_DELETE_SUCCESS: '일정이 삭제되었습니다.',
  PLAN_DELETE_FAIL: '일정 삭제에 실패했어요.',
  PLAN_LOAD_FAIL: '일정을 불러오지 못했어요.',
});

export const MENT_LOGIN = Object.freeze({
  WELCOME: '반가워요!\n그로잉펫을 만나고 싶다면\n커플연결을 해주세요☺️',
  SHARE: '연인에게 공유하기',
  INVITED: '상대방 코드 입력하기',
  INVITED_INPUT: '상대방의 코드를 입력해주세요!',
  BIRTH: '생일을 입력해주세요!',
  NICKNAME: '닉네임을 입력해주세요!',
  ANNIVERSARY: '처음만난 날은 언제인가요?',
  PET_BIRTH: '축하합니다!\n함께 성장해 나갈\n그로잉펫이 태어났어요!',
  PET_MEET: '그로잉펫 만나러 가기 🙌',
  WAITING: '상대방을 기다리는 중이에요',
  CLICK: '👆 작성 후에, 알을 클릭해주세요!',
  COPY: '복사되었습니다.',
});

export const MENT_LOGOUT = Object.freeze({
  CONFIRM: '로그아웃 하시겠습니까?',
});

export const MENT_MORE = Object.freeze({
  PET_NOT_EXIST: '아직 졸업한 동물이 없네요 😢',
  PROFILE_MODIFY_SUCCESS_TITLE: '프로필 수정 성공🎉',
  PROFILE_MODIFY_SUCCESS_DESC: '프로필이 수정되었습니다.',
  PROFILE_MODIFY_CANCEL_TITLE: '프로필 수정 취소',
  PROFILE_MODIFY_CANCEL_DESC:
    '변경하신 내용이 취소됩니다.\n정말 나가시겠습니까?',
  PROFILE_MODIFY_FAIL: '프로필 수정에 실패했습니다.',
});

export default MENT_HOME;
