<template>
  <div class="movice-contianer">
    <van-dropdown-menu>
      <van-dropdown-item v-model="area" :options="areaOption" />
      <van-dropdown-item v-model="type" :options="typeOption" />
      <van-dropdown-item v-model="order" :options="orderOption" />
    </van-dropdown-menu>
    <div class="flex-wraper">
      <router-link v-for="(item, index) in dataList" :key="index" :to="`/mv/${item.id}`">
        <div class="wraper-item">
          <img :src="item.cover" alt />
          <div class="num-wrap">
            <div class="num">{{item.playCount}}</div>
          </div>
          <p class="desc">{{item.name}}</p>
        </div>
      </router-link>
    </div>
    <!-- 分页 -->
    <van-pagination
      @change="fnChange"
      v-model="currentPage"
      mode="multi"
      :page-count="1000"
      :show-page-size="5"
      force-ellipses
    />
  </div>
</template>

<script>
export default {
  name: "Movice",
  data() {
    return {
      limit: 8, // 每页请求的数据
      currentPage: 1,
      area: "全部",
      type: "全部",
      order: "上升最快",
      areaOption: [
        //
        { text: "全部", value: "全部" },
        { text: "内地", value: "内地" },
        { text: "港台", value: "港台" },
        { text: "欧美", value: "欧美" },
        { text: "日本", value: "日本" },
        { text: "韩", value: "韩" }
      ],
      typeOption: [
        { text: "全部", value: "全部" },
        { text: "官方版", value: "官方版" },
        { text: "原声", value: "原声" },
        { text: "现场版", value: "现场版" },
        { text: "网易出品", value: "网易出品" }
      ],
      orderOption: [
        {
          text: "上升最快",
          value: "上升最快"
        },
        {
          text: "最热",
          value: "最热"
        },
        {
          text: "最新",
          value: "最新"
        }
      ],
      dataList: []
    };
  },
  created() {
    this.currentData();
  },
  methods: {
    async currentData() {
      const res = await this.$axios.get("/mv/all", {
        params: {
          limit: this.limit,
          area: this.area,
          order: this.order,
          type: this.type,
          offset: (this.currentPage - 1) * this.limit,
          t: Date.now()
        }
      });
      if (res.data.hasMore) {
        this.dataList = res.data.data;
      } else {
        this.$toast.info("没有数据了");
      }
    },
    fnChange(val) {
      this.currentPage = val;
      this.currentData();
    }
  },
  watch: {
    area(news, olds) {
      if (news !== olds) {
        this.currentPage = 1;
        this.area = news;
        this.currentData();
      }
    },
    type(news, olds) {
      if (news !== olds) {
        this.currentPage = 1;
        this.type = news;
        this.currentData();
      }
    },
    order(news, olds) {
      if (news !== olds) {
        this.currentPage = 1;
        this.order = news;
        this.currentData();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.movice-contianer {
  height: 100%;
  margin-bottom: 50px;
  .flex-wraper {
    margin: 10px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .wraper-item {
      position: relative;
      margin-bottom: 10px;
      img {
        width: 150px;
      }
      .num-wrap {
        position: absolute;
        top: 0;
        right: 2px;
        color: #fff;
      }
      .desc {
        text-align: left;
        font-size: 16px;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>