<template>
  <div class="playerList-container">
    <van-nav-bar title="播放列表" left-arrow @click-left="$router.back()" />
    <div class="title-wraper" v-if="oDetails">
      <img :src="oDetails.coverImgUrl" />
      <div class="info-wraper">
        <p class="title">{{oDetails.name}}</p>
        <p class="imag">
          <img :src="oDetails.creator.avatarUrl" />
          <span class="name">{{oDetails.creator.nickname}}</span>
          <span class="time">{{oDetails.creator.birthday | formatExclueTime }}</span>
        </p>
        <p class="tags">标签&nbsp;:&nbsp;{{oDetails.tags.join("/")}}</p>
        <p class="desc">简介&nbsp;:&nbsp;{{oDetails.creator.signature}}</p>
      </div>
    </div>
    <!-- 列表 -->
    <van-tabs v-model="active" :sticky="true" line-width="100px" :swipeable="true">
      <van-tab title="歌曲列表">
        <van-cell-group v-if="oDetails">
          <van-cell v-for="(obj, index) in oDetails.tracks" :key="index">
            <slot name="default">
              <div class="item" v-if="obj.m" @click="fnPlayer(obj.id)">
                <img :src="obj.al.picUrl" />
                <div class="info-wraper">
                  <p class="title">标题:&nbsp;&nbsp;{{obj.name}}</p>
                  <p class="athor">歌手:&nbsp;&nbsp;{{obj.ar[0].name}}</p>
                  <p class="edit">编辑:&nbsp;&nbsp;{{obj.ar[0].name}}</p>
                  <p class="time">时间:&nbsp;&nbsp;{{obj.m.br | foreTime}}</p>
                </div>
              </div>
            </slot>
          </van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab :title="`最新评论(${total})`">
        <div class="comment" v-if="total!==0">
          <div class="comment-wrap">
            <div class="item" v-for="(item, index) in hotComments" :key="index">
              <img :src="item.user.avatarUrl" />
              <div class="info">
                <p class="title">
                  <span class="auth">{{item.user.nickname}}:</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="content">{{item.content}}</span>
                </p>
                <p class="times">{{item.time | formatYear}}</p>
                <van-divider />
              </div>
            </div>
          </div>
        </div>
        <div v-else>暂无数据</div>
      </van-tab>
    </van-tabs>
    <div class="playing">
      <audio :src="playerUrl" controls ref="isPlay" autoplay />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      oDetails: null,
      hotComments: [],
      playerUrl: "",
      total: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.currentData();
  },
  methods: {
    async currentData() {
      //playlist/detail?id=3114158828&t=1585475552813
      const res = await this.$axios.get("/playlist/detail", {
        params: { id: this.id, t: Date.now() }
      });
      //  comment/hot?type=2&id=2714089494&t=1585711377006
      const comment = await this.$axios.get("comment/hot", {
        params: { type: 2, id: this.id, t: Date.now() }
      });
      this.hotComments = comment.data.hotComments;
      this.total = comment.data.total;
      this.oDetails = res.data.playlist;
    },
    async fnPlayer(id) {
      const res = await this.$axios.get("song/url", {
        params: { id, t: Date.now() }
      });
      // console.log(res)
      this.playerUrl = res.data.data[0].url;

      // this.$refs.isPlay.onPlay()
      // console.log(this.$refs.isPlay.play())
    }
  }
};
</script>

<style lang="less" scoped>
.playerList-container {
  height: 100%;
  padding: 0 10px;
  .title-wraper {
    display: flex;
    img {
      flex: 1;
      width: 125px;
      height: 125px;
    }
    .info-wraper {
      text-align: left;
      margin-left: 10px;
      .title {
        font-size: 21px;
        margin-bottom: 10px;
        white-space: nowrap;
        width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .imag {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        span {
          margin-left: 15px;
          font-size: 15px;
        }
      }
      .tags {
        margin: 10px 0;
      }
      .desc {
        display: -webkit-box;
        height: 88px;
        width: 220px;
        overflow: hidden;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
    }
  }

  .item {
    display: flex;
    align-content: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      //  vertical-align: bottom
      margin-top: 11px;
    }
    .info-wraper {
      margin-left: 20px;
    }
  }
  // 评论列表
  // 最新评论
  .comment {
    .title {
      text-align: left;
    }
    .comment-wrap {
      margin-top: 10px;
      .item {
        // border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        display: flex;
        // justify-content: ;
        flex-wrap: wrap;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .info {
          box-sizing: border-box;
          margin-left: 20px;
          width: 275px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          .title {
            .auth {
              color: #517eaf;
            }
          }
          .times {
            text-align: left;
            margin-top: 10px;
            color: #ccc;
          }
        }
      }
    }
  }
  // 音乐播放
  .playing {
    width: 100%;
    audio {
      background: rgb(241, 243, 244);
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;

      // height: 100%;
    }
  }
}
</style>