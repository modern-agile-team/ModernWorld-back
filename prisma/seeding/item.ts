import { PrismaClient } from "@prisma/client";

const BASE_URL = process.env.S3_BASE_URL;

export function item(prisma: PrismaClient) {
  return prisma.item.createMany({
    data: [
      {
        no: 1,
        name: "꽃잎 등",
        description: "방 안을 꽃향기로 채워요",
        image: BASE_URL + "/items/item/theme_spring/spring_light1.svg",
        theme: "봄 테마",
        type: "1번 타입",
        price: 500,
      },
      {
        no: 2,
        name: "도마 위의 빵조각",
        description: "브런치를 즐겨요",
        image: BASE_URL + "/items/item/theme_spring/spring_bread.svg",
        theme: "봄 테마",
        type: "2번 타입",
        price: 300,
      },
      {
        no: 3,
        name: "도시락 바구니",
        description: "도시락 싸서 피크닉 어때요?",
        image: BASE_URL + "/items/item/theme_spring/spring_basket1.svg",
        theme: "봄 테마",
        type: "3번 타입",
        price: 900,
      },
      {
        no: 4,
        name: "봄 열린 창문",
        description: "화분에 싹이 났어요",
        image: BASE_URL + "/items/item/theme_spring/spring_window1.svg",
        theme: "봄 테마",
        type: "4번 타입",
        price: 500,
      },
      {
        no: 5,
        name: "봄 닫힌 창문",
        description: "봄 채광이 비쳐요",
        image: BASE_URL + "/items/item/theme_spring/spring_window2.svg",
        theme: "봄 테마",
        type: "5번 타입",
        price: 600,
      },
      {
        no: 6,
        name: "에이드",
        description: "시원한 에이드를 마셔요",
        image: BASE_URL + "/items/item/theme_spring/spring_juice.svg",
        theme: "봄 테마",
        type: "6번 타입",
        price: 300,
      },
      {
        no: 7,
        name: "행운의 엽서",
        description: "행운이 들어와요",
        image: BASE_URL + "/items/item/theme_spring/spring_happylatter.svg",
        theme: "봄 테마",
        type: "7번 타입",
        price: 300,
      },
      {
        no: 8,
        name: "봄 카페트",
        description: "봄에는 린넨 소재의 카페트를 사용해요",
        image: BASE_URL + "/items/item/theme_spring/spring_capet1.svg",
        theme: "봄 테마",
        type: "8번 타입",
        price: 500,
      },
      {
        no: 9,
        name: "나들이 모자 ",
        description: "모자 쓰고 놀러가요",
        image: BASE_URL + "/items/item/theme_spring/spring_hat1.svg",
        theme: "봄 테마",
        type: "9번 타입",
        price: 300,
      },
      {
        no: 10,
        name: "과일 한 접시",
        description: "보기만 해도 기분이 좋아져요",
        image: BASE_URL + "/items/item/theme_spring/spring_fruit.svg",
        theme: "봄 테마",
        type: "10번 타입",
        price: 900,
      },
      {
        no: 11,
        name: "봄 벽지",
        description: "봄 벽지예요",
        image: BASE_URL + "/items/item/theme_spring/spring_wall.svg",
        theme: "봄 테마",
        type: "11번 타입",
        price: 1000,
      },
      {
        no: 12,
        name: "봄 바닥",
        description: "봄 바닥이에요",
        image: BASE_URL + "/items/item/theme_spring/spring_floor.svg",
        theme: "봄 테마",
        type: "12번 타입",
        price: 1000,
      },
      {
        no: 13,
        name: "물고기 등",
        description: "방 안을 푸르게 밝혀줘요",
        image: BASE_URL + "/items/item/theme_summer/summer_light1.svg",
        theme: "여름 테마",
        type: "1번 타입",
        price: 500,
      },
      {
        no: 14,
        name: "물장구 장화 ",
        description: "비 맞으며 놀았어요",
        image: BASE_URL + "/items/item/theme_summer/summer_boots.svg",
        theme: "여름 테마",
        type: "2번 타입",
        price: 300,
      },
      {
        no: 15,
        name: "모기향",
        description: "모기를 피하고 싶다면 모기향을 피우면 돼요.",
        image: BASE_URL + "/items/item/theme_summer/summer_repellent.svg",
        theme: "여름 테마",
        type: "3번 타입",
        price: 300,
      },
      {
        no: 16,
        name: "여름의 창문",
        description: "창문이 없으면 안 돼요.",
        image: BASE_URL + "/items/item/theme_summer/summer_window1.svg",
        theme: "여름 테마",
        type: "4번 타입",
        price: 500,
      },
      {
        no: 17,
        name: "열린 여름의 창문",
        description: "창문을 열면 여름의 능소화가 반겨줘요",
        image: BASE_URL + "/items/item/theme_summer/summer_window2.svg",
        theme: "여름 테마",
        type: "5번 타입",
        price: 600,
      },
      {
        no: 18,
        name: "아이스 선풍기",
        description: "무더운 여름을 버티려면 선풍기가 필요해요",
        image: BASE_URL + "/items/item/theme_summer/summer_fan.svg",
        theme: "여름 테마",
        type: "6번 타입",
        price: 900,
      },
      {
        no: 19,
        name: "물꼬기 어항",
        description: "여름에는 물멍이 최고예요",
        image: BASE_URL + "/items/item/theme_summer/summer_fish_tank.svg",
        theme: "여름 테마",
        type: "7번 타입",
        price: 1000,
      },
      {
        no: 20,
        name: "토마토 카페트",
        description: "몸에도 좋고 맛도 좋은 토마토로 카페트를 만들었어요",
        image: BASE_URL + "/items/item/theme_summer/summer_capet.svg",
        theme: "여름 테마",
        type: "8번 타입",
        price: 500,
      },
      {
        no: 21,
        name: "수박수박 접시",
        description: "수박... 좋아하세요...?",
        image: BASE_URL + "/items/item/theme_summer/summer_watermelon.svg",
        theme: "여름 테마",
        type: "9번 타입",
        price: 300,
      },
      {
        no: 22,
        name: "빙수야 팥빙수야",
        description: "여름에는 빙수가 먹고 싶어져요",
        image: BASE_URL + "/items/item/theme_summer/summer_shaved_ice.svg",
        theme: "여름 테마",
        type: "10번 타입",
        price: 300,
      },
      {
        no: 23,
        name: "여름 벽지",
        description: "여름 벽지예요",
        image: BASE_URL + "/items/item/theme_summer/summer_wall.svg",
        theme: "여름 테마",
        type: "11번 타입",
        price: 1000,
      },
      {
        no: 24,
        name: "여름 바닥",
        description: "여름 바닥이에요",
        image: BASE_URL + "/items/item/theme_summer/summer_floor.svg",
        theme: "여름 테마",
        type: "12번 타입",
        price: 1000,
      },
      {
        no: 25,
        name: "가을 샹들리에",
        description: "가을에는 비싼 샹들리에 하나 둬도 좋을거 같아요",
        image: BASE_URL + "/items/item/theme_fall/spring_lamp1.svg",
        theme: "가을 테마",
        type: "1번 타입",
        price: 900,
      },
      {
        no: 26,
        name: "의문의 오브제",
        description: "무슨 용도일까요?",
        image: BASE_URL + "/items/item/theme_fall/fall_curious.svg",
        theme: "가을 테마",
        type: "2번 타입",
        price: 900,
      },
      {
        no: 27,
        name: "잡동사니 선반",
        description: "서랍 안에 무엇이 있을까요?",
        image: BASE_URL + "/items/item/theme_fall/fall_cabinet1.svg",
        theme: "가을 테마",
        type: "3번 타입",
        price: 500,
      },
      {
        no: 28,
        name: "깃털 모음집",
        description: "주웠어요!",
        image: BASE_URL + "/items/item/theme_fall/fall_feather1.svg",
        theme: "가을 테마",
        type: "4번 타입",
        price: 300,
      },
      {
        no: 29,
        name: "할아버지 시계",
        description: "째깍째깍 시계멍을 해봐요",
        image: BASE_URL + "/items/item/theme_fall/fall_clock1.svg",
        theme: "가을 테마",
        type: "5번 타입",
        price: 500,
      },
      {
        no: 30,
        name: "주전부리",
        description: "입이 심심할떄 먹어요",
        image: BASE_URL + "/items/item/theme_fall/fall_basket1.svg",
        theme: "가을 테마",
        type: "6번 타입",
        price: 500,
      },
      {
        no: 31,
        name: "브라운 소파",
        description: "가을 소파는 심플한 걸로 해요",
        image: BASE_URL + "/items/item/theme_fall/fall_sofa1.svg",
        theme: "가을 테마",
        type: "7번 타입",
        price: 900,
      },
      {
        no: 32,
        name: "블루 카페트",
        description: "카페트는 필수에요",
        image: BASE_URL + "/items/item/theme_fall/fall_capet1.svg",
        theme: "가을 테마",
        type: "8번 타입",
        price: 500,
      },
      {
        no: 33,
        name: "편안한 의자",
        description: "가을에는 의자에 앉아서 편히 쉬어가요",
        image: BASE_URL + "/items/item/theme_fall/fall_chair1.svg",
        theme: "가을 테마",
        type: "9번 타입",
        price: 900,
      },
      {
        no: 34,
        name: "꽃 화분",
        description: "가을에는 조화 화분을 둬요.",
        image: BASE_URL + "/items/item/theme_fall/fall_flower1.svg",
        theme: "가을 테마",
        type: "10번 타입",
        price: 300,
      },
      {
        no: 35,
        name: "가을 벽지",
        description: "가을 벽지예요",
        image: BASE_URL + "/items/item/theme_fall/fall_wall.svg",
        theme: "가을 테마",
        type: "11번 타입",
        price: 1000,
      },
      {
        no: 36,
        name: "가을 바닥",
        description: "가을 바닥이에요",
        image: BASE_URL + "/items/item/theme_fall/fall_floor.svg",
        theme: "가을 테마",
        type: "12번 타입",
        price: 1000,
      },
      {
        no: 37,
        name: "겨울 전구",
        description: "방 안을 따뜻하게 밝혀 줘요",
        image: BASE_URL + "/items/item/theme_winter/winter_lamp1.svg",
        theme: "겨울 테마",
        type: "1번 타입",
        price: 500,
      },
      {
        no: 38,
        name: "주전자 난로",
        description: "따뜻하게 겨울을 보내요",
        image: BASE_URL + "/items/item/theme_winter/winter_stove1.svg",
        theme: "겨울 테마",
        type: "2번 타입",
        price: 900,
      },
      {
        no: 39,
        name: "크리스마스 트리",
        description: "보고만 있어도 행복해져요",
        image: BASE_URL + "/items/item/theme_winter/winter_tree1.svg",
        theme: "겨울 테마",
        type: "3번 타입",
        price: 1000,
      },
      {
        no: 40,
        name: "커튼 내린 창문",
        description: "겨울과 어울리는 커튼 색으로 달아줬어요",
        image: BASE_URL + "/items/item/theme_winter/winter_window33.svg",
        theme: "겨울 테마",
        type: "4번 타입",
        price: 500,
      },
      {
        no: 41,
        name: "커튼 친 창문",
        description: "겨울과 어울리는 커튼 색으로 달아줬어요",
        image: BASE_URL + "/items/item/theme_winter/winter_window22.svg",
        theme: "겨울 테마",
        type: "5번 타입",
        price: 600,
      },
      {
        no: 42,
        name: "따뜻한 의자",
        description: "엉뜨 기능이 있어요",
        image: BASE_URL + "/items/item/theme_winter/winter_table1.svg",
        theme: "겨울 테마",
        type: "6번 타입",
        price: 500,
      },
      {
        no: 43,
        name: "겨울의 소파",
        description: "겨울의 소파예요",
        image: BASE_URL + "/items/item/theme_winter/winter_sofa1.svg",
        theme: "겨울 테마",
        type: "7번 타입",
        price: 900,
      },
      {
        no: 44,
        name: "보드란 카페트",
        description: "발 시려우면 안 돼요",
        image: BASE_URL + "/items/item/theme_winter/winter_carpet1.svg",
        theme: "겨울 테마",
        type: "8번 타입",
        price: 500,
      },
      {
        no: 45,
        name: "고양이 인형",
        description: "캐릭터에게 친구를 만들어 줘요",
        image: BASE_URL + "/items/item/theme_winter/winter_cat1.svg",
        theme: "겨울 테마",
        type: "9번 타입",
        price: 300,
      },
      {
        no: 46,
        name: "책무더기",
        description: "겨울에는 따뜻한 집에서 독서하며 힐링해요",
        image: BASE_URL + "/items/item/theme_winter/winter_book1.svg",
        theme: "겨울 테마",
        type: "10번 타입",
        price: 300,
      },
      {
        no: 47,
        name: "겨울 벽지",
        description: "겨울 벽지예요",
        image: BASE_URL + "/items/item/theme_winter/winter_wall2.svg",
        theme: "겨울 테마",
        type: "11번 타입",
        price: 1000,
      },
      {
        no: 48,
        name: "겨울 바닥",
        description: "겨울 바닥이에요",
        image: BASE_URL + "/items/item/theme_winter/winter_floor2.svg",
        theme: "겨울 테마",
        type: "12번 타입",
        price: 1000,
      },
    ],
  });
}
