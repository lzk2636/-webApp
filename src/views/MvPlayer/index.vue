<template>
  <div class="player-container">
    <van-nav-bar
      title="播放列表"
      left-arrow
      @click-left="$router.back()"
    
    />
    <div class="player">
      <h4 class="player-title">mv详情</h4>
      <van-divider />
      <video controls :src="mp4Url"></video>
    </div>
    <div class="info-wrap" v-if="oDetail">
      <div class="img-wrap">
        <img :src="oDetail.cover" alt />
        <span class="auth">{{oDetail.artistName}}</span>
      </div>
      <div class="songInfo">
        <p class="name">{{oDetail.name}}</p>
        <p class="other">
          <span>发布:{{oDetail.playCount}}</span>
          <span>播放:{{oDetail.publishTime}}</span>
        </p>
      </div>
    </div>
    <van-divider />
    <div class="connect">
      <h4 class="title">相关推荐</h4>
      <div class="connent-wrap">
        <div
          class="item"
          v-for="(item, index) in mvsList"
          :key="index"
          @click="$router.push('/mv/'+item.id)"
        >
          <div class="imag-wrap">
            <img :src="item.cover" />
            <div class="count">{{item.playCount |filterWang}}</div>
            <p class="time">{{item.duration | foreTime}}</p>
          </div>
          <div class="info">
            <p class="name">{{item.name}}</p>
            <p class="auth">{{item.artistName}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 最新评论 -->
    <van-divider />
    <div class="comment">
      <h4 class="title">最新评论({{total}})</h4>
      <div class="comment-wrap">
        <div class="item" v-for="(item, index) in commentsList" :key="index">
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
    <van-divider />
    <van-pagination
      v-model="currentPage"
      :total-items="total"
      :show-page-size="3"
      :page-count="pageNum"
      force-ellipses
      @change="fnChange"
    />
  </div>
</template>

<script>
export default {
  name: "MvPlayer",
  data() {
    return {
      currentPage: 1,
      id: "",
      mp4Url: "",
      mvsList: [],
      oDetail: null,
      limit: 5,
      commentsList: [],
      total: 0,
      pageNum: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.currentData();
    this.commentData();
  },
  methods: {
    async commentData() {
      //comment/mv?id=391005&limit=5&offset=0&t=1585457645353
      const res = await this.$axios.get("comment/mv", {
        params: {
          id: this.id,
          limit: this.limit,
          offset: (this.currentPage - 1) * this.limit,
          t: Date.now()
        }
      });
      this.commentsList = res.data.comments;
      this.total = res.data.total;
      this.pageNum = Math.ceil(this.total / this.limit);
    },
    async currentData() {
      // MP4Url
      const res = await this.$axios.get("/mv/url", {
        params: { id: this.id, t: Date.now() }
      });
      this.mp4Url = res.data.data.url;
      //mvs
      const mvs = await this.$axios.get("simi/mv", {
        params: { mvid: this.id, t: Date.now() }
      });
      this.mvsList = mvs.data.mvs;
      // detail
      const detail = await this.$axios.get("mv/detail", {
        params: { mvid: this.id, t: Date.now() }
      });
      this.oDetail = detail.data.data;
    },
    fnChange(val) {
      // console.log(val);
      this.currentPage = val;
      this.commentData();
    }
  },
  watch: {
    $route(news, olds) {
      if (news.params.id !== olds.params.id) {
        this.id = news.params.id;
        this.currentData();
        this.commentData();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.player-container {
  height: 100%;
  padding: 15px;
  .player {
    text-align: left;
    video {
      width: 100%;
    }
  }
  .info-wrap {
    margin-top: 20px;
    display: flex;
    align-content: center;
    .img-wrap {
      margin-left: 15px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .auth {
        display: block;
      }
    }
    .songInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 20px;
      .name {
        font-size: 18px;
      }
      .other {
        color: #ccc;
        font-size: 12px;
        span {
          margin-right: 15px;
        }
      }
    }
  }
  // 相关推荐
  .connect {
    text-align: left;

    .connent-wrap {
      .item {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-evenly;
        .imag-wrap {
          color: #fff;
          position: relative;
          font-size: 15px;
          img {
            width: 170px;
          }
          .count {
            position: absolute;
            right: 0;
            top: 0;
          }
          .time {
            position: absolute;
            bottom: 5px;
            right: 1px;
          }
        }
        .info {
          margin-left: 20px;
          margin-top: 28px;
          .name {
            font-size: 20px;
            font-weight: 500;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 140px;
            // word-wrap: ;
            white-space: nowrap;
          }
          .auth {
            font-size: 12px;
            color: #ccc;
          }
        }
      }
    }
  }
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
}
</style>