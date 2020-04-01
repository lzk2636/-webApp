<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" class="active_tab" Route>
      <van-tabbar-item
        v-for="(item,index) in tabbars"
        :key="index"
        @click="tab(index,item.name)"
        :to="item.to"
      >
        <span :class="currIndex == index ? active:''">{{item.title}}</span>
        <template slot="icon">
          <i :class="item.icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      currIndex: 0,
      tabbars: [
        {
          icon: "iconfont icon-music",
          title: "发现音乐",
          to: "/homeMusic"
        },
        {
          icon: "iconfont icon-music1",
          title: "推荐歌单",
          to: "/remplaylist"
        },
        { icon: "iconfont icon-Music", title: "最新音乐", to: "/newmusic" },
        { icon: "iconfont icon-move", title: "最新mv", to: "/movice" }
      ]
    };
  },
  methods: {
    tab(index, name) {
      this.currIndex = index;
      // this.$axios(sss)
    }
  }
};
</script>

<style>
</style>