<template>
  <div class="newsMusic-container">
    <van-tabs v-model="activeName">
      <van-tab :title="item.title" :name="item.type" v-for="(item, index) in tab" :key="index">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell-group>
            <van-cell v-for="(obj, index) in item.list" :key="index">
              <slot name="default">
                <div class="item" @click="fnClick(obj.id)">
                  <img :src="obj.album.picUrl" />
                  <div class="info-wraper">
                    <p class="title">标题:&nbsp;&nbsp;{{obj.name}}</p>
                    <p class="athor">歌手:&nbsp;&nbsp;{{obj.artists[0].name}}</p>
                    <p v-if="obj.album" class="edit">编辑:&nbsp;&nbsp;{{obj.album.name}}</p>
                    <p
                      v-if="obj.mMusic"
                      class="time"
                    >时间:&nbsp;&nbsp;{{obj.mMusic.playTime | foreTime}}</p>
                  </div>
                </div>
              </slot>
            </van-cell>
          </van-cell-group>
        </van-list>
      </van-tab>
    </van-tabs>
    <div class="playing">
      <audio :src="playerUrl" controls  autoplay />
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMusic",
  data() {
    return {
      playerUrl:"",
      activeName: 0,
      loading: false,
      tab: [
        {
          title: "全部",
          type: 0,
          list: [],
          loading: false,
          finished: false
        },
        {
          title: "华语",
          type: 7,
          list: [],
          loading: false,
          finished: false
        },
        {
          title: "欧美",
          type: 96,
          list: [],
          loading: false,
          finished: false
        },
        {
          title: "日本",
          type: 8,
          list: [],
          loading: false,
          finished: false
        },
        {
          title: "韩国",
          type: 16,
          list: [],
          loading: false,
          finished: false
        }
      ]
    };
  },
  methods: {
    // 播放音乐 ?id=1436054819&t=1585722351531
    async fnClick(id){
      const res = await this.$axios.get('song/url',{
        params:{id,t:Date.now()}
      })
      this.playerUrl=res.data.data[0].url
      // console.log(id)
      // this.$router.push('/pla')
    },
    onLoad() {
      // setTimeout(() => {
      this.fnCurrentData();
    },
    async fnCurrentData() {
      const index = this.tab.findIndex(item => item.type === this.activeName);
      const res = await this.$axios.get("top/song", {
        params: {
          type: this.activeName,
          t: Date.now()
        }
      });
      if (res.data.code === 200) {
        // console.log(res);
        this.tab[index].list = res.data.data;
      }
    }
  },
  watch: {
    activeName(news, olds) {
      if (news !== olds) {
        this.activeName = news;
        this.fnCurrentData();
      }
    }
  }
};
</script>

<style lang="less">
.newsMusic-container {
  height: 100%;
  margin-bottom: 50px;

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
  // 音乐播放
  .playing {
    width: 100%;
    audio {
      background: rgb(241, 243, 244);
      position: fixed;
      bottom: 50%;
      right: -50%;
      width: 100%;
      // height: 100%;
      transform: rotate(90deg) translateY(50%);

      // height: 100%;
    }
  }
}
</style>