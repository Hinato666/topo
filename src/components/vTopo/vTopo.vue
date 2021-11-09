<template>
  <div class="topoComponent">
    <div class="svgHead">
      <ul class="svgHeadItemLst">
        <li
          class="svgHeadItem"
          v-for="(ele, key) in svgToolbar"
          :key="ele.className"
          :class="{ active: ele.isActive }"
          :title="ele.name"
          @mousedown="selectToolbar(key)"
        >
          <div class="svgHeadItemImg" :class="ele.className"></div>
        </li>
      </ul>
      <ul class="svgHeadItemLst">
        <li class="svgToolBarItem" title="保存">
          <i class="fa fa-save svgToolBarIcon"></i>
          <span class="svgToolBarTxt hidden-xs-only">保存</span>
        </li>
      </ul>
    </div>
    <div class="svgMain">
      <v-shapebar @click="dragShapeNode"></v-shapebar>
      <div class="topoWrap" :id="'topoId' + topoId" ref="topoWrap">
        <treetopo class="topoSvg"></treetopo>
      </div>
    </div>
    <div
      v-if="shapebarMoveNode.isShow"
      class="moveNode nodeMoveCss"
      :style="{
        left: shapebarMoveNode.left + 'px',
        top: shapebarMoveNode.top + 'px',
      }"
    >
      <div class="shapeIcon">
        <img class="shapeIconImg" :src="shapebarMoveNode.icon" />
      </div>
      <div class="shapeName">{{ shapebarMoveNode.name }}</div>
    </div>
  </div>
</template>

<script>
import vShapebar from "./components/vShapebar";
import treetopo from "../../views/treetopo/index.vue";
import $ from "jquery";
export default {
  name: "Topo",
  components: {
    vShapebar,
    treetopo,
  },
  props: {},
  data() {
    return {
      svgToolbar: [
        { name: "默认模式", className: "toolbar-default", isActive: true },
        {
          name: "框选模式",
          className: "toolbar-rectangle_selection",
          isActive: false,
        },
      ],
      topoId: "",
      shapebarMoveNode: {
        left: 0,
        top: 0,
        name: "",
        icon: "",
        isShow: false,
      },
      svgAttr: {
        width: 0,
        height: 0,
        isHand: false,
        viewX: 0,
        viewY: 0,
        minW: 0,
        minH: 0,
        isCrosshair: false,
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    GenNonDuplicateID(randomLength) {
      return Number(
        Math.random().toString().substr(3, randomLength) + Date.now()
      ).toString(36);
    },
    //svg工具栏选择工具
    selectToolbar(key) {
      this.svgToolbar.forEach((ele) => {
        ele.isActive = false;
      });
      this.svgToolbar[key].isActive = true;
    },
    //拖拽shapeBar中的node
    dragShapeNode(nodeData, key, event) {
      let NODE = nodeData[key];
      let toolbarName = NODE.type;
      let toolbarIcon = NODE.icon;
      let topoEle = $(`#topoId${this.topoId}`);
      let svgOffsetLeft = topoEle.find(".topoSvg").offset().left;
      let svgOffsetTop = topoEle.find(".topoSvg").offset().top;
      let svgWidth = topoEle.find(".topoSvg").width();
      let svgHeight = topoEle.find(".topoSvg").height();
      let isContainSvgArea = false;
      document.onmousemove = (event) => {
        let mouseX = event.clientX; //当前鼠标位置
        let mouseY = event.clientY;
        console.log(mouseX);
        let nodeX =
          event.clientX -
          svgOffsetLeft +
          $(document).scrollLeft() +
          this.svgAttr.viewX; //svg最终位置
        let nodeY =
          event.clientY -
          svgOffsetTop +
          $(document).scrollTop() +
          this.svgAttr.viewY;
        isContainSvgArea = false;
        this.shapebarMoveNode.left = mouseX + 4 + $(document).scrollLeft(); // 鼠标位置 + 文档滚动的距离
        this.shapebarMoveNode.top = mouseY + 4 + $(document).scrollTop();
        console.log(this.shapebarMoveNode.left);
        this.shapebarMoveNode.name = toolbarName;
        this.shapebarMoveNode.icon = toolbarIcon;
        this.shapebarMoveNode.isShow = true;
      };
      document.onmouseup = (event) => {
        document.onmousemove = null;
        document.onmouseup = null;
        //重新初始toolbarMoveNode的值
        this.shapebarMoveNode.left = 0;
        this.shapebarMoveNode.top = 0;
        this.shapebarMoveNode.name = "";
        this.shapebarMoveNode.icon = "";
        this.shapebarMoveNode.isShow = false;
      };
    },
  },
  created() {},
  mounted() {
    this.topoId = this.GenNonDuplicateID(5);
  },
};
</script>
<style lang="less" scoped>
@svg-common-color: #768699;
@stroke-width: 2;
@stroke-select-width: 3;
@stroke-select-color: red;
@border-color: #aaaaaa;
@storke-dasharray: 5, 5;
.topoComponent {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/*svgHead工具栏*/
.svgHead {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f3;
  border: solid @border-color;
  border-width: 1px 1px 0;
  box-shadow: inset 0 1px 0 0 #fff;
  .svgHeadItemLst {
    display: flex;
    .svgHeadItem {
      padding: 5px 10px;
      border: 1px solid @border-color;
      cursor: pointer;
      list-style: none;
      border-left-width: 0;
      &:hover {
        background-color: #ebebeb;
      }
      &:first-child {
        border-left-width: 1px;
      }
      &.active {
        background-color: #ebebeb;
        box-shadow: 2px 2px 1px #ccc inset;
      }
      .svgHeadItemImg {
        background: url("../../assets/topo/icons.png");
        width: 16px;
        height: 16px;
        background-size: 479px 16px;
        &.toolbar-default {
          background-position: -16px 0px;
        }
        &.toolbar-rectangle_selection {
          background-position: -294px 0px;
        }
        &.toolbar-zoomin {
          background-position: -425px 0px;
        }
        &.toolbar-zoomout {
          background-position: -444px 0px;
        }
        &.toolbar-zoomreset {
          background-position: -462px 0px;
        }
      }
    }
    .svgToolBarItem {
      font-size: 13px;
      color: #525252;
      padding: 5px 10px;
      border-radius: 2px;
      box-sizing: border-box;
      margin-left: 5px;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      .svgToolBarTxt {
        margin-left: 2px;
      }
    }
  }
}
.svgMain {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex: 1;
}
/*svgMain右侧svg主体区域*/
.topoWrap {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid @border-color;
  overflow: hidden;
  position: relative;
  background: #fff;
  .topoSvg {
    box-sizing: border-box;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
    -moz-select: none;
    -ms-select: none;
    -o-select: none;
    &.hand {
      cursor: pointer;
    }
    &.crosshair {
      cursor: crosshair;
    }
  }
}
.moveNode {
  position: absolute;
  border: 1px solid @svg-common-color;
  box-sizing: border-box;
  &.nodeMoveCss {
    width: 57px;
    height: 57px;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
    box-sizing: border-box;
    padding: 5px;
  }
}
</style>