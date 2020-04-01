<template>
  <div class="rec-Container">
    <div class="bannner"  v-if="highqualityMessage">
      <img :src="highqualityMessage.coverImgUrl" />
      <div class="right">
        <!-- <p class="tag">精品歌单</p> -->
        <van-tag color="rgba(0,0,0,0.5)" text-color="#dfac67">精品歌单</van-tag>
        <div class="info">
          <div class="title">{{highqualityMessage.name}}</div>
          <div class="desc">{{highqualityMessage.description}}</div>
        </div>
      </div>
    </div>

    <van-tabs v-model="activeName" swipeable>
      <van-tab v-for="(item,index) in tab" :key="index" :title="item.title" :name="item.title">
        <div class="flex-content">
          <div
            class="item"
            @mouseenter="fnEnter"
            @mouseleave="fnOuter"
            @click="fnClick(item)"
            v-for="(item,index) in item.playlists"
            :key="index"
          >
            <div class="imag-wrap">
              <div class="num" ref="add" :class="{active:bIsAcive}">
                播放量:
                <span>{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt />
            </div>
            <p class="subDes">{{item.description}}</p>
          </div>
        </div>
        <!-- 页面显示 -->
        <van-pagination
          @change="fnChange"
          v-model="item.currentPage"
          :page-count="item.total"
          :show-page-size="item.size" 
          force-ellipses
        />
        <!-- 页码的数量 -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "RecPlaylist",
  data() {
    return {
      limit: 9,
      cat: "全部",
      highqualityMessage: {},
      activeName: "全部",
      bIsAcive: false,
      offset: 0,

      tab: [
        {
          title: "全部",
          currentPage: 1,
          total: 100,// 总页数
          size: 5,
          playlists: []
        },
        {
          title: "欧美",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "华语",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "流行",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "说唱",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "摇滚",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "民谣",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "电子",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "轻音乐",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "影视原声",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "ACG",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "怀旧",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "治愈",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        },
        {
          title: "旅行",
          currentPage: 1,
          total: 100,
          size: 5,
          playlists: []
        }
      ]
    };
  },
  created() {
    // top/playlist/highquality?limit=1&cat=%E5%85%A8%E9%83%A8&t=1585287895242
    this.highquality();
    //top/playlist?limit=10&offset=0&cat=%E5%85%A8%E9%83%A8&t=1585294163235
    this.fnPlayList();
  },

  methods: {
    fnChange(val){
        const index = this.tab.findIndex(item => item.title === this.activeName);
        this.tab[index].currentPage=val
        this.fnPlayList()
      // console.log(val)

    },
    async fnPlayList() {
      const index = this.tab.findIndex(item => item.title === this.activeName);
      const res = await this.$axios.get("top/playlist", {
        params: {
          limit: this.limit,
          cat: this.cat,
          offset: (this.tab[index].currentPage - 1) * this.limit
        }
      });

      this.tab[index].total = Math.ceil(res.data.total/this.limit);
      this.tab[index].playlists = res.data.playlists;
      // console.log(res);
    },
    fnClick(item){
      this.$router.push('/playlist/'+item.id)
    },
    fnOuter() {
      this.bIsAcive = false;
    },
    fnEnter() {
      this.bIsAcive = true;
    },
    async highquality() {
      const res = await this.$axios.get("top/playlist/highquality", {
        params: { limit: 1, cat: this.cat, t: Date.now() }
      });
      this.highqualityMessage = res.data.playlists[0];
    }
  },
  watch: {
    activeName(news, olds) {
      if (news !== olds) {
        this.cat = news;
        this.highquality();
        this.fnPlayList()
      }
    }
  }
};
</script>

<style lang="less" scoped>
.rec-Container {
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
  .bannner {
    margin: 10px 20px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    height: 200px;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;

    img {
      width: 100px;
      height: 100%;
    }
    .right {
      margin-left: 5px;
      text-align: left;
      .tag {
        color: #dfac67;
        width: auto;
        display: inline-block;
        padding: 0 6px;
        border: 1px solid #dfac67;
        border-radius: 5px;
        font-size: 16px;
        line-height: 30px;
        cursor: pointer;
        margin-bottom: 6px;
      }
      .title {
        color: #fff;
        font-size: 16px;
        font-weight: 500;
      }
      .desc {
        padding-top: 5px;
        font-size: 12px;
        color: #888482;
      }
    }
  }
  .flex-content {
    margin: 10px 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .item {
      width: 30%;
      margin-bottom: 10px;
      cursor: pointer;
      // a {
      .imag-wrap {
        position: relative;
        overflow: hidden;

        .num {
          // display: none;
          position: absolute;
          top: -25px;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          height: 25px;
          font-size: 15px;
          line-height: 25px;
          width: 100%;
          color: #fff;
        }
        .active {
          top: 0;
        }
        img {
          width: 100%;
          border-radius: 5px;
        }
      }
      .subDes {
        width: 112px;
        height: 30px;
        font-size: 12px;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
      }
      // }
    }
  }
  .van-pagination {
    padding: 10px;
  }
}
</style>