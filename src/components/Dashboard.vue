<script setup>
// import base
import { ref, reactive, onMounted } from 'vue';

import lottie from 'lottie-web';
import DotsLottie from '@lottie/dots';

import { getLabs, getBlocks } from '@api/data';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel } from 'swiper';
import 'swiper/css';
const modules = [Mousewheel];

const swiper = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].reverse();

/**
 * swiper 触摸动画
 */
const state = reactive({
  isTouchBlock: false,
  isTouchTransaction: false,
  isShowModal: false,
  modalType: 1, // 1:block ; 2: transaction
  labs: [], // 节点列表
  blocks: [], //区块列表
  transactions: [], //存证列表
});

/** swiper  */
/**
 * 点击查看详情
 * @param {*} e
 * @param {*} type block or transaction
 * @param {*} index
 */
const toSwiperDetail = (e, type, index) => {
  // console.log(index);
  // console.log('click');
  if (state.isTouch) return;
  setTimeout(() => {
    if (state.isTouch) return;
    state.modalType = type;
    state.isShowModal = true;
  }, 300);
};
// 滑动
const touchBlock = () => {
  console.log('begin touch');
  state.isTouchBlock = true;
};
const touchTransaction = () => (state.isTouchTransaction = true);
const endTouch = () => {
  console.log('end touch');
  state.isTouch = false;
  state.isTouchBlock = false;
  state.isTouchTransaction = false;
};
const touching = () => {
  state.isTouch = true;
};

/**
 * 加载小绘卡通人物的lottie动画
 */
const dots = ref();
const dotsAnimation = () => {
  lottie.loadAnimation({
    container: dots.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: DotsLottie,
  });
};

/** fetch data */
const fetchData = async () => {
  state.labs = await getLabs();
  state.blocks = await getBlocks();
};

onMounted(() => {
  dotsAnimation();
  fetchData();
});

// block detail
const blockDetail = [
  'Channel Name',
  'Block Number',
  'Created at',
  'Number of Transaction',
  'Block Hash',
  'Data Hash',
  'Prehash',
];
// transaction detail
const transactionDetail = [
  'Transaction ID',
  'Valienation Code ',
  'PayloadProposal Hash',
  'Creator MSP',
  'Chaincode Name',
  'Type',
  'Time',
  'Reads',
  'Writes',
];

// 点击中间的地图节点
const onClickDot = (index) => {
  console.log({ index });
};
</script>

<template>
  <div class="dashboard" @touchend="endTouch" @touchmove="touching">
    <div class="header">
      <img class="bg" src="@images/header-bg@2x.png" alt="header-bg" />
      <div class="content">
        <img class="logo" src="@images/logo@2x.png" alt="logo" />
        <div class="title text-outline">
          崖州湾科技城育种存证
          <span style="font-weight: 100">区块链平台</span>
        </div>
      </div>
    </div>
    <div class="content-outer-wrapper">
      <div class="bg-wrapper">
        <div class="border-left">
          <img src="@images/border-left@2x.png" alt="border" />
        </div>
        <div class="border-right">
          <img src="@images/border-right@2x.png" alt="border" />
        </div>
      </div>
      <div class="content-inner-wrapper">
        <!-- bg -->
        <div class="bg-top-left text-title">地点：<span style="font-weight: 100">三亚 · 崖州湾</span></div>
        <div class="bg-top-right">
          <span class="text-title">节点列表：</span>
          <div class="list">
            <div class="item" v-for="(lab, index) in state.labs.slice(0, 3)" :key="lab">
              <img src="@images/icon-more@2x.png" class="icon-more" v-if="index === 2" />
              <span class="text-subtitle" v-else>{{ lab }}</span>
            </div>
          </div>
        </div>
        <div class="bg-bottom-left"><img class="logo-lenovo" src="@images/logo-lenovo@2x.png" alt="lenovo" /></div>
        <div class="bg-bottom-right"><img class="icon-compass" src="@images/icon-compass@2x.png" alt="compass" /></div>
        <!-- main-left -->
        <div class="main-left">
          <!-- 区块列表 -->
          <div class="block-list-wrapper list-wrapper" @touchstart="touchBlock" @mousedown="touchBlock">
            <div class="outline text-title">区块 <span style="font-weight: 100">列表</span></div>
            <img
              :class="['bg-line', state.isTouchBlock ? 'bg-line-transparent' : '']"
              src="@images/block-line@2x.png"
              alt="block-line"
            />
            <Swiper
              :direction="'vertical'"
              :slidesPerView="'auto'"
              :scrollbar="true"
              :mousewheel="true"
              :modules="modules"
              class="x-swiper swiper-block"
            >
              <SwiperSlide
                class="x-swiper-slide"
                v-for="(s, index) in swiper"
                :key="s"
                data-index="index"
                @touchend="toSwiperDetail(e, (type = 1), index)"
              >
                <div class="block-title" @click="toSwiperDetail(e, (type = 1), index)">
                  <img class="icon-block" src="@images/icon-block-item@2x.png" alt="block" />
                  <span class="text-normal">Block {{ s }}</span>
                  <img class="icon-data" src="@images/icon-data@2x.png" alt="icon" />
                </div>
                <div class="block-content" @click="toSwiperDetail(e, (type = 1), index)">
                  <div class="channel-name text-detail">
                    Channel Name：<span style="font-weight: 100">testcha</span>
                  </div>
                  <div class="datahash text-detail">Datahash：<span style="font-weight: 100">af65skdnsks</span></div>
                  <div class="number-of-tx text-detail">Number of Tx：<span style="font-weight: 100">1</span></div>
                  <div class="date text-detail text-red">3days ago</div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <!-- 存证列表 -->
          <div class="transaction-list-wrapper list-wrapper" @touchstart="touchTransaction">
            <div class="outline text-title">存证 <span style="font-weight: 100">列表</span></div>
            <img
              src="@images/transaction-line@2x.png"
              alt="block-line"
              :class="['bg-line', state.isTouchTransaction ? 'bg-line-transparent' : '']"
            />
            <Swiper
              :direction="'vertical'"
              :slidesPerView="'auto'"
              :scrollbar="true"
              :mousewheel="true"
              :modules="modules"
              class="x-swiper swiper-transaction"
            >
              <SwiperSlide
                class="x-swiper-slide"
                v-for="(s, index) in swiper"
                :key="s"
                @touchstart="toSwiperDetail(e, (type = 2), index)"
              >
                <div class="block-title">
                  <img class="icon-block" src="@images/icon-transaction-item@2x.png" alt="block" />
                  <span class="text-normal">Block {{ s }}</span>
                  <img class="icon-data" src="@images/icon-data@2x.png" alt="icon" />
                </div>
                <div class="block-content">
                  <div class="channel-name text-detail">
                    Channel Name：<span style="font-weight: 100">testcha</span>
                  </div>
                  <div class="datahash text-detail">Datahash：<span style="font-weight: 100">af65skdnsks</span></div>
                  <div class="number-of-tx text-detail">Number of Tx：<span style="font-weight: 100">1</span></div>
                  <div class="date text-detail text-green">3days ago</div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <!-- main-dots -->
        <div class="dots-wrapper" ref="dots">
          <div class="dots-transparent-wrapper">
            <div class="dot dot-1" @click="onClickDot(1)"></div>
            <div class="dot dot-2"></div>
            <div class="dot dot-3"></div>
            <div class="dot dot-4"></div>
            <div class="dot dot-5"></div>
          </div>
        </div>
        <!-- main-right -->
        <div class="main-right">
          <div class="block-num-wrapper list-wrapper">
            <div class="text-subtitle">块高度</div>
            <div class="text-num">32345</div>
          </div>
          <div class="dot-num-wrapper list-wrapper">
            <div class="text-subtitle">节点数量</div>
            <div class="text-num">7</div>
          </div>
          <div class="transaction-num-wrapper list-wrapper">
            <div class="text-subtitle">存证数量</div>
            <div class="text-num">35563</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 弹窗 -->
  <teleport to="body">
    <Transition>
      <div class="modal-wrapper" v-show="state.isShowModal" @click="state.isShowModal = false">
        <div :class="['modal', state.modalType === 1 ? 'modal-block' : 'modal-transaction']">
          <div class="header">
            <div class="text-subtitle">
              {{ state.modalType === 1 ? '区块' : '存证' }} <span style="font-weight: 100">详情</span>
            </div>
            <img class="icon-close" src="@images/icon-close@2x.png" alt="icon-close" />
          </div>

          <div class="content">
            <div class="item" v-for="item in state.modalType === 1 ? blockDetail : transactionDetail" :key="item">
              <div class="text-normal label">{{ item }}：</div>
              <div class="text-normal value">1</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style lang="less">
// transtion
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
// animation
@keyframes scaleUp {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(300);
  }
}
// text
.text {
  opacity: 0.8;
}
.text-outline {
  &:extend(.text);
  font-weight: bold;
  font-size: @font-size-xl;
}
.text-title {
  &:extend(.text);
  font-weight: bold;
  font-size: @font-size-l;
}
.text-subtitle {
  &:extend(.text);
  font-size: @font-size-base;
}
.text-normal {
  &:extend(.text);
  font-size: @font-size-s;
}
.text-detail {
  &:extend(.text);
  font-size: @font-size-xs;
}
.text-num {
  &:extend(.text);
  font-size: @font-size-xxl;
  line-height: 32px;
  margin-top: 7px;
}

.dashboard {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: no-repeat center url('@images/bg@2x.png');
  background-size: cover;
  padding: 21px 18px 28px 18px;

  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 45px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    // FIXME:
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: @backdrop-filter;

    .bg {
      width: 100%;
      height: 45px;
      position: absolute;
      top: 0;
      left: 0;
      // object-fit: cover;
    }

    .content {
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logo {
        width: 77px;
        height: 23px;
      }

      .title {
        margin-left: 16px;
      }
    }
  }

  .content-outer-wrapper {
    position: relative;
    width: 100%;
    flex: 1;
    margin-top: 20px;

    .bg-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      .border-left,
      .border-right {
        position: absolute;
        top: 0;
        // width: 4px;
        height: 100%;
      }

      .border-left {
        left: 0;
      }

      .border-right {
        right: 0;
      }

      .bg-dots {
        width: 453px;
        height: 370px;
      }
    }

    .content-inner-wrapper {
      width: calc(100% - 15px * 2);
      height: 100%;
      margin: 0 15px;
      position: relative;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .bg-top-left {
        position: absolute;
        left: 0;
        top: 0;
      }

      .bg-top-right {
        position: absolute;
        right: 0;
        top: 0;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .text-title {
          margin-right: 28px;
        }

        .list {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .item {
            background: rgba(86, 137, 132, 0.2);

            margin-left: 12px;
            .icon-more {
              // width: calc(27px - 12px);
              // height: calc(27px - 8px * 2);
              width: 27px;
              height: 27px;
            }
            .text-subtitle {
              display: inline-block;
              padding: 8px 12px;
              color: #20dded;
            }
          }
        }
      }

      .bg-bottom-left {
        position: absolute;
        left: 0;
        bottom: 0;
        .logo-lenovo {
          width: 92px;
          height: 20px;
          object-fit: contain;
        }
      }

      .bg-bottom-right {
        position: absolute;
        right: 0;
        bottom: 0;
        .icon-compass {
          width: 44px;
          height: 66px;
        }
      }

      .main-left {
        z-index: 10;

        .list-wrapper {
          width: 246px;
          height: 174px;
          backdrop-filter: @backdrop-filter;

          .outline {
            margin-left: 32px;
            line-height: 23px;
          }

          .bg-line {
            position: absolute;
            width: 1px;
            height: 130px;
            top: 38px;
            left: 16px;
            z-index: 20;
            transition: all 0.1s linear 0.1s;
          }

          .bg-line-transparent {
            opacity: 0;
          }

          .swiper-slide-active {
            .icon-block {
              filter: grayscale(0) !important;
            }
          }

          .x-swiper {
            width: 246px;
            height: 150px;
            // background-color: green;
            .x-swiper-slide {
              width: 246px;
              height: 84px;
              position: relative;

              .block-title {
                width: 246px;
                height: 21px;
                background-color: rgba(48, 48, 48, 0.6);
                backdrop-filter: @backdrop-filter;

                display: flex;
                justify-content: space-between;
                align-items: center;

                padding: 0 9px 0 8px;

                .icon-block {
                  width: 17px;
                  height: 19px;
                  filter: grayscale(1);

                  transition: all 0.3s linear;
                }

                .text-normal {
                  display: inline-block;
                  line-height: 21px;
                  width: calc(201px - 7px * 2);
                  height: 21px;
                }

                .icon-data {
                  width: 11px;
                  height: 11px;
                  opacity: 0.3;
                }
              }

              .block-content {
                height: 63px;
                padding: 6px 32px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0.4;

                .text-red {
                  color: @orange;
                }

                .text-green {
                  color: @green;
                }
              }
            }
          }
        }

        .block-list-wrapper {
          background: no-repeat center url('@images/block-list-wrapper-bg@2x.png');
          background-size: cover;
        }

        .transaction-list-wrapper {
          margin-top: 12px;
          background: no-repeat center url('@images/transaction-list-wrapper-bg@2x.png');
          background-size: cover;
        }
      }

      .main-right {
        .list-wrapper {
          width: 180px;
          height: 96px;
          backdrop-filter: @backdrop-filter;
          padding: 35px 0 9px 82px;
        }

        .block-num-wrapper {
          background: no-repeat center url('@images/bg-block-num@2x.png');
          background-size: cover;
        }

        .dot-num-wrapper {
          background: no-repeat center url('@images/bg-dot-num@2x.png');
          background-size: cover;
          margin-top: 12px;
        }

        .transaction-num-wrapper {
          background: no-repeat center url('@images/bg-transaction-num@2x.png');
          background-size: cover;
          margin-top: 12px;
        }
      }

      .dots-wrapper {
        position: relative;
        color: transparent;
        svg {
          pointer-events: none;
          transform: translate3d(-8%, -4%, 0px);
        }
        .dots-transparent-wrapper {
          position: absolute;
          // z-index: 10;

          .dot {
            position: absolute;
            width: 80px;
            height: 80px;
            // background: rgba(255, 255, 255, 0.2);
            &:active {
              &::after {
                content: '';
                position: absolute;
                left: 40px;
                top: 40px;
                width: 1px;
                height: 1px;
                background: rgba(255, 255, 255, 0.16);
                border-radius: 50%;
                animation: 3s ease-out scaleUp infinite alternate;
              }
            }
          }
          .dot-1 {
            left: 170px;
            top: 310px;
          }
          .dot-2 {
            left: 360px;
            top: 280px;
          }
          .dot-3 {
            left: 174px;
            top: 76px;
          }
          .dot-4 {
            left: 320px;
            top: 50px;
          }
          .dot-5 {
            left: 450px;
            top: 70px;
          }
        }
      }
    }
  }
}

.modal-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  overflow: hidden;

  .modal {
    .header {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text-subtitle {
        line-height: 30px;
      }

      .icon-close {
        width: 20px;
        height: 20px;
        object-fit: cover;
      }
    }

    .content {
      height: 200px;
      overflow-y: scroll;
      padding: 28px 122px 24px 7px;
      display: grid;
      align-content: space-between;

      .item {
        display: flex;
        align-items: center;
        .label {
          width: 150px;
        }
      }
    }
  }

  .modal-block {
    padding: 94px 6px 127px 50px;
    width: 686px;
    height: 428px;
    background: no-repeat center url('@images/bg-detail-block@2x.png');
    background-size: cover;
  }

  .modal-transaction {
    width: 723px;
    height: 461px;
    background: no-repeat center url('@images/bg-detail-transaction@2x.png');
    background-size: cover;
    padding: 56px 50px 100px 42px;

    .content {
      height: 300px;
    }
  }
}
</style>
