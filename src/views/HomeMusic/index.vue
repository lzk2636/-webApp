<template>
  <div class="home-container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in bannerList" :key="index">
        <img :src="item.imageUrl" />
      </van-swipe-item>
    </van-swipe>
    <!-- 推荐歌单 -->
    <div class="remList">
      <h3 class="title">推荐歌单</h3>
      <div class="conetent">
        <van-grid :gutter="2" :border="false" :column-num="5">
          <van-grid-item v-for="(item,index) in songList" :key="index" @click="fnChickDetail(item.id)">
            <slot name="default">
              <img :src="item.picUrl" />
              <h6>{{item.name}}</h6>
            </slot>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="newMusic">
      <h3 class="title">最新音乐</h3>
      <van-grid :gutter="2" :border="false" :column-num="2">
        <van-grid-item v-for="(item,index) in newsongList" :key="index" @click="fnNewSong(item.id)">
          <slot name="default">
            <div class="flex-wraper">
              <img :src="item.picUrl" />
              <div class="right">
                <h6>{{item.name}}</h6>
                <h6>{{item.song.album.artists[0].name}}</h6>
              </div>
            </div>
          </slot>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 最新MV -->
    <div class="mv">
      <h3 class="title">推荐MV</h3>
      <div class="contianer">
        <div class="item" v-for="(item,index) in mvList" :key="index" @click="$router.push(`/mv/${item.id}`)">
          <img :src="item.picUrl" alt />
          <p class="subdes">{{item.name}}</p>
          <p class="aut">{{item.artists[0].name}}</p>
        </div>
      </div>
    </div>
    <!-- 播放器 -->
    <audio :src="playUrl" controls class="playing" autoplay></audio>
  </div>
</template>

<script>
export default {
  name: "HomeMusic",
  data() {
    return {
      bannerList: [],
      songList: [],
      newsongList: [],
      mvList: [],
      playUrl:""
    };
  },
  created() {
    this.currentBanner();
    this.remSongList();
    // 最新歌曲
    this.fnMusicNew();
    //推荐mv
    this.fnMv();
  },
  methods: {
    // 找到新的歌曲
    async fnNewSong(id){

     const res=await this.$axios.get('song/url',{params:{id,t:Date.now()}})
     this.playUrl=res.data.data[0].url
    },
    async fnChickDetail(id){
      // console.log(id)
      this.$router.push('/playlist/'+id)

    },
    async fnMusicNew() {
      const res = await this.$axios.get("personalized/newsong", {
        params: { t: Date.now() }
      });
      this.newsongList = res.data.result;
    },
    async currentBanner() {
      // console.log(this.$axios)
      const res = await this.$axios.get("banner", {
        params: { t: Date.now() }
      });
      this.bannerList = res.data.banners;
    },
    async remSongList() {
      const res = await this.$axios.get("personalized", {
        params: { limit: 10, t: Date.now() }
      });
      this.songList = res.data.result;
    },
    async fnMv() {
      const res = await this.$axios.get("personalized/mv", {
        params: { t: Date.now() }
      });
      console.log(res);
      this.mvList = res.data.result;
    }
  }
};
</script>

<style lang="less">
@paddLeft: 10px;
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 216px;

  text-align: center;
  // background-color: #39a9ed;
  img {
    width: 100%;
    height: 216px;
  }
}
.home-container {
  height: 100%;
  margin-bottom: 50px;

  .remList {
    h3 {
      text-align: left;
      padding-left: @paddLeft;
      margin-bottom: 5px;
    }
    .conetent {
      img {
        width: 50px;
        height: 50px;
      }
      h6 {
        width: 52px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .newMusic {
    text-align: left;
    .title {
      padding-left: @paddLeft;
    }
    .flex-wraper {
      display: flex;
      // justify-content: space-evenly;
      img {
        width: 50%;
        height: 100%;
      }
      .right {
        display: -webkit-box;
        display: flex;
        padding-left: 5px;
        flex-direction: column;
      
        justify-content: space-evenly;

      }
      // height: 6px;
    }
  }
  .mv {
    .title {
      padding-left: @paddLeft;
      text-align: left;
    }
    .contianer {
      display: flex;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      // width:  auto;
      .item {
        margin: 5px;
        text-align: left;
        img {
          width: 160px;
          height: 80px;
        }
        .subdes {
          text-overflow: ellipsis;
          width: 160px;
          overflow: hidden;
          white-space: nowrap;
        }
        .aut {
          line-height: 20px;
          font-size: 13px;
          color: #ccc;
        }
      }
    }
  }
  // 播放器
  .playing {
    position: fixed;
    top: 50%;
    right: 0;
    width: 100%;
    transform-origin: center center;
    transform: translate(46%, -50%) rotate(90deg) scale(0.6);
  }
}
</style>