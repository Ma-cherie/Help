'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    showIcon: {
      type: Boolean,
      value: true // 是否显示 search icon
    },
    iconColor: {
      type: String,
      value: '#bbb' // search icon 的颜色
    },
    phColor: {
      type: String,
      value: '#bbb' // placeholder 的颜色
    },
    bgColor: {
      type: String,
      value: '#f6f6f6' // 搜索栏背景色
    },
    align: {
      type: String,
      value: 'left' // static 模式下，内容居左还是居中center, left
    },
    color: {
      type: String,
      value: '#333' // 输入框字体颜色
    },
    radius: {
      type: [Number, String],
      value: 6 // 圆角弧度
    },
    placeholder: {
      type: String,
      value: '搜索'
    },
    mode: {
      type: String,
      value: 'normal' // normal static
    },
    showClear: {
      type: Boolean,
      value: true
    },
    button: {
      type: String,
      value: '' // 显示按钮
    },
    btnColor: {
      type: String,
      value: '#333' // 按钮颜色
    }
  },
  data: {
    _showClear: false,
    value: ''
  },
  methods: {
    onInput: function onInput(e) {
      var value = e.detail.value;
      var _showClear = value && this.data.showClear;
      this.setData({
        value: value,
        _showClear: _showClear
      });

      var detail = e.detail || {};
      var option = {};
      this.triggerEvent('input', detail, option);
    },
    onConfirm: function onConfirm(e) {
      var detail = e.detail || {};
      var option = {};
      detail.value = this.data.value;
      this.triggerEvent('confirm', detail, option);
    },
    onSubmit: function onSubmit(e) {
      var detail = e.detail || {};
      var option = {};
      detail.value = this.data.value;
      this.triggerEvent('submit', detail, option);
    },
    onClear: function onClear() {
      this.setData({
        value: '',
        _showClear: false
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJwcm9wZXJ0aWVzIiwic2hvd0ljb24iLCJ0eXBlIiwiQm9vbGVhbiIsInZhbHVlIiwiaWNvbkNvbG9yIiwiU3RyaW5nIiwicGhDb2xvciIsImJnQ29sb3IiLCJhbGlnbiIsImNvbG9yIiwicmFkaXVzIiwiTnVtYmVyIiwicGxhY2Vob2xkZXIiLCJtb2RlIiwic2hvd0NsZWFyIiwiYnV0dG9uIiwiYnRuQ29sb3IiLCJkYXRhIiwiX3Nob3dDbGVhciIsIm1ldGhvZHMiLCJvbklucHV0IiwiZSIsImRldGFpbCIsInNldERhdGEiLCJvcHRpb24iLCJ0cmlnZ2VyRXZlbnQiLCJvbkNvbmZpcm0iLCJvblN1Ym1pdCIsIm9uQ2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1FQSxhQUFXLEU7QUFDWEMsY0FBWTtBQUNWQyxjQUFVO0FBQ1JDLFlBQU1DLE9BREU7QUFFUkMsYUFBTyxJQUZDLENBRUk7QUFGSixLQURBO0FBS1ZDLGVBQVc7QUFDVEgsWUFBTUksTUFERztBQUVURixhQUFPLE1BRkUsQ0FFSztBQUZMLEtBTEQ7QUFTVkcsYUFBUztBQUNQTCxZQUFNSSxNQURDO0FBRVBGLGFBQU8sTUFGQSxDQUVPO0FBRlAsS0FUQztBQWFWSSxhQUFTO0FBQ1BOLFlBQU1JLE1BREM7QUFFUEYsYUFBTyxTQUZBLENBRVU7QUFGVixLQWJDO0FBaUJWSyxXQUFPO0FBQ0xQLFlBQU1JLE1BREQ7QUFFTEYsYUFBTyxNQUZGLENBRVM7QUFGVCxLQWpCRztBQXFCVk0sV0FBTztBQUNMUixZQUFNSSxNQUREO0FBRUxGLGFBQU8sTUFGRixDQUVTO0FBRlQsS0FyQkc7QUF5QlZPLFlBQVE7QUFDTlQsWUFBTSxDQUFDVSxNQUFELEVBQVNOLE1BQVQsQ0FEQTtBQUVORixhQUFPLENBRkQsQ0FFSTtBQUZKLEtBekJFO0FBNkJWUyxpQkFBYTtBQUNYWCxZQUFNSSxNQURLO0FBRVhGLGFBQU87QUFGSSxLQTdCSDtBQWlDVlUsVUFBTTtBQUNKWixZQUFNSSxNQURGO0FBRUpGLGFBQU8sUUFGSCxDQUVZO0FBRlosS0FqQ0k7QUFxQ1ZXLGVBQVc7QUFDVGIsWUFBTUMsT0FERztBQUVUQyxhQUFPO0FBRkUsS0FyQ0Q7QUF5Q1ZZLFlBQVE7QUFDTmQsWUFBTUksTUFEQTtBQUVORixhQUFPLEVBRkQsQ0FFSTtBQUZKLEtBekNFO0FBNkNWYSxjQUFVO0FBQ1JmLFlBQU1JLE1BREU7QUFFUkYsYUFBTyxNQUZDLENBRU07QUFGTjtBQTdDQSxHO0FBa0RaYyxRQUFNO0FBQ0pDLGdCQUFZLEtBRFI7QUFFSmYsV0FBTztBQUZILEc7QUFJTmdCLFdBQVM7QUFDUEMsV0FETyxtQkFDQ0MsQ0FERCxFQUNJO0FBQ1QsVUFBSWxCLFFBQVFrQixFQUFFQyxNQUFGLENBQVNuQixLQUFyQjtBQUNBLFVBQUllLGFBQWFmLFNBQVMsS0FBS2MsSUFBTCxDQUFVSCxTQUFwQztBQUNBLFdBQUtTLE9BQUwsQ0FBYTtBQUNYcEIsb0JBRFc7QUFFWGU7QUFGVyxPQUFiOztBQUtBLFVBQUlJLFNBQVNELEVBQUVDLE1BQUYsSUFBWSxFQUF6QjtBQUNBLFVBQUlFLFNBQVMsRUFBYjtBQUNBLFdBQUtDLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkJILE1BQTNCLEVBQW1DRSxNQUFuQztBQUNELEtBWk07QUFhUEUsYUFiTyxxQkFhR0wsQ0FiSCxFQWFNO0FBQ1gsVUFBSUMsU0FBU0QsRUFBRUMsTUFBRixJQUFZLEVBQXpCO0FBQ0EsVUFBSUUsU0FBUyxFQUFiO0FBQ0FGLGFBQU9uQixLQUFQLEdBQWUsS0FBS2MsSUFBTCxDQUFVZCxLQUF6QjtBQUNBLFdBQUtzQixZQUFMLENBQWtCLFNBQWxCLEVBQTZCSCxNQUE3QixFQUFxQ0UsTUFBckM7QUFDRCxLQWxCTTtBQW1CUEcsWUFuQk8sb0JBbUJFTixDQW5CRixFQW1CSztBQUNWLFVBQUlDLFNBQVNELEVBQUVDLE1BQUYsSUFBWSxFQUF6QjtBQUNBLFVBQUlFLFNBQVMsRUFBYjtBQUNBRixhQUFPbkIsS0FBUCxHQUFlLEtBQUtjLElBQUwsQ0FBVWQsS0FBekI7QUFDQSxXQUFLc0IsWUFBTCxDQUFrQixRQUFsQixFQUE0QkgsTUFBNUIsRUFBb0NFLE1BQXBDO0FBQ0QsS0F4Qk07QUF5QlBJLFdBekJPLHFCQXlCRztBQUNSLFdBQUtMLE9BQUwsQ0FBYTtBQUNYcEIsZUFBTyxFQURJO0FBRVhlLG9CQUFZO0FBRkQsT0FBYjtBQUlEO0FBOUJNIiwiZmlsZSI6ImluZGV4Lnd4YyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJ1xuICAgIH1cbiAgfSxcbiAgYmVoYXZpb3JzOiBbIF0sXG4gIHByb3BlcnRpZXM6IHtcbiAgICBzaG93SWNvbjoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiB0cnVlIC8vIOaYr+WQpuaYvuekuiBzZWFyY2ggaWNvblxuICAgIH0sXG4gICAgaWNvbkNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJyNiYmInIC8vIHNlYXJjaCBpY29uIOeahOminOiJslxuICAgIH0sXG4gICAgcGhDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcjYmJiJyAvLyBwbGFjZWhvbGRlciDnmoTpopzoibJcbiAgICB9LFxuICAgIGJnQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnI2Y2ZjZmNicgLy8g5pCc57Si5qCP6IOM5pmv6ImyXG4gICAgfSxcbiAgICBhbGlnbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICdsZWZ0JyAvLyBzdGF0aWMg5qih5byP5LiL77yM5YaF5a655bGF5bem6L+Y5piv5bGF5LitY2VudGVyLCBsZWZ0XG4gICAgfSxcbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcjMzMzJyAvLyDovpPlhaXmoYblrZfkvZPpopzoibJcbiAgICB9LFxuICAgIHJhZGl1czoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIHZhbHVlOiA2ICAvLyDlnIbop5LlvKfluqZcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ+aQnOe0oidcbiAgICB9LFxuICAgIG1vZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnbm9ybWFsJyAvLyBub3JtYWwgc3RhdGljXG4gICAgfSxcbiAgICBzaG93Q2xlYXI6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogdHJ1ZVxuICAgIH0sXG4gICAgYnV0dG9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJycgLy8g5pi+56S65oyJ6ZKuXG4gICAgfSxcbiAgICBidG5Db2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcjMzMzJyAvLyDmjInpkq7popzoibJcbiAgICB9LFxuICB9LFxuICBkYXRhOiB7XG4gICAgX3Nob3dDbGVhcjogZmFsc2UsXG4gICAgdmFsdWU6ICcnXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbklucHV0KGUpIHtcbiAgICAgIGxldCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgbGV0IF9zaG93Q2xlYXIgPSB2YWx1ZSAmJiB0aGlzLmRhdGEuc2hvd0NsZWFyO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIF9zaG93Q2xlYXJcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgZGV0YWlsID0gZS5kZXRhaWwgfHwge307XG4gICAgICBsZXQgb3B0aW9uID0ge307XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnaW5wdXQnLCBkZXRhaWwsIG9wdGlvbik7XG4gICAgfSxcbiAgICBvbkNvbmZpcm0oZSkge1xuICAgICAgbGV0IGRldGFpbCA9IGUuZGV0YWlsIHx8IHt9O1xuICAgICAgbGV0IG9wdGlvbiA9IHt9O1xuICAgICAgZGV0YWlsLnZhbHVlID0gdGhpcy5kYXRhLnZhbHVlO1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2NvbmZpcm0nLCBkZXRhaWwsIG9wdGlvbik7XG4gICAgfSxcbiAgICBvblN1Ym1pdChlKSB7XG4gICAgICBsZXQgZGV0YWlsID0gZS5kZXRhaWwgfHwge307XG4gICAgICBsZXQgb3B0aW9uID0ge307XG4gICAgICBkZXRhaWwudmFsdWUgPSB0aGlzLmRhdGEudmFsdWU7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnc3VibWl0JywgZGV0YWlsLCBvcHRpb24pO1xuICAgIH0sXG4gICAgb25DbGVhcigpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgX3Nob3dDbGVhcjogZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuICB9XG59Il19