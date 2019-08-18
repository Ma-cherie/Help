const app = require('./appframework.js')

class BaseFlexModel {
    constructor(obj) {
        this.id = obj.id;
        this.container = obj.container;
        this.styleString = ""
        if (typeof obj.styleObject === 'object') {
            const style = obj.styleObject
            for (let key in style) {
                if (style.hasOwnProperty(key)) {
                    this[key] = style[key]
                }
            }
            this.updateStyle()
        }
        
    }
    
    // 使用驼峰结构，这样才可以利用js的点语法；如果用了`-`则只能用subscript了
    updateStyle() {
        let str = ""
        if (typeof this["color"] === "string") {
            str += ("color: " + this["color"] + ";")
        }
        if (typeof this["backgroundColor"] === "string") {
            str += ("background-color: " + this["backgroundColor"] + ";")
        }
        if (typeof this["borderColor"] === "string") {
            str += ("border-color: " + this["borderColor"] + ";")
        }
        if (typeof this["visibility"] === 'string') {
            str += ("visibility: " + this["visibility"] + ";")
        }
        this.styleString = str
    }

    get isVisiable() {
        return this.visible;
    }

    set isVisiable(newValue) {
        this.visible = newValue
    }
    
    get visible() {
        if (typeof this["visibility"] === 'string') {
            return this["visibility"] === "visible"
        } else {
            return true
        }
        return this._name.toUpperCase();
    }
    
    set visible(newValue) {
        if (typeof newValue !== 'boolean') {
            return
        }
        if (newValue) {
            this["visibility"] = "visible"
        } else {
            this["visibility"] = "hidden"
        }
        this.updateStyle()
    }
    
    get stateContainer() {
        var cur = this;
        while (!!cur) {
            if (cur instanceof StackViewFlexModel || cur.__target__ instanceof StackViewFlexModel) {
                return cur
            }
            cur = cur.container
        }
        
    }

    get containerState() {
        return this.stateContainer && this.stateContainer.state
    }

    set containerState(state) {
        const container = this.stateContainer
        if (container) {
            container.state = state
        }
    }

}

class ViewFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
    }
}

class ButtonFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.value = obj.value || "按钮"
        this.disabled = obj.disabled || false
        this.openType = obj.openType || ""
    }
}

class ImageViewFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.mode = obj.mode || "aspectFit"
        this.src = obj.src || "https://servicewechat.com/wxa-dev-logic/visualprogramming?action=download-image&media-id=iteNMiTitqDmI4sNssYzgGSKmZdv3H3_NtJJCSkqhPLTS72zYp3gWYRdJjKwle_k&content-type=img/png&openid=o6zAJs6sE1PiaAq0i-S7qXF37tuQ&appid=wx20edba31460266c0"
    }
    
    saveImageToPhotosAlbum() {
        app.saveImageToPhotosAlbum(this.src)
    }
    
    previewImage() {
        app.previewImage(this.src)
    }
}

class LabelFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.value = obj.value || ""
        this.updateStyle()
    }
}

class InputFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.value = obj.value || ""
        this.placeholder = obj.placeholder || ""
    }
    
    updateValue(page, e) {
        this.value = e.detail.value
    }
}

class TextareaFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.value = obj.value || ""
        this.placeholder = obj.placeholder || ""
    }
    
    updateValue(page, e) {
        this.value = e.detail.value
    }
}

class VideoFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.value = obj.value || "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    }
}

class SwitchFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        if (obj.hasOwnProperty("checked")) {
            this.checked = obj.checked
        } else {
            this.checked = false
        }
    }
    
    updateValue(page, e) {
        this.checked = e.detail.value
    }
}

class SwiperFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
    }
}

class WeuiInputModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.title = obj.title || "标题"
        this.value = obj.value || ""
        this.placeholder = obj.placeholder || "请输入文本"
    }
    
    updateValue(page, e) {
        this.value = e.detail.value
    }
}

class WeuiTextareaModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.value = obj.value || ""
        this.placeholder = obj.placeholder || "请输入文本"
    }
    
    updateValue(page, e) {
        this.value = e.detail.value
    }
}

class WeuiRadioModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.values = obj.values || []
        if (obj.hasOwnProperty("selectedIndex")) {
            this.selectedIndex = obj.selectedIndex
        } else {
            this.selectedIndex = obj.selectedIndex = NaN
        }
    }
    
    updateValue(page, e) {
        page[this.id].selectedIndex = e.detail.value
    }
    
    get size() {
        if (Array.isArray(this.values)) {
            return this.values.length
        } else {
            return 0
        }
    }
    
    get isSelected() {
        if (typeof this.selectedIndex === 'number') {
            if (this.selectedIndex === NaN) {
                return false
            } else {
                return true
            }
        }
        return false
    }
}

class WeuiCheckboxModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.values = obj.values || []
    }
    
    updateValue(page, e) {
        let values = this.values
        for (let i = 0; i < values.length; ++i) {
            values[i].checked = e.detail.value.includes(String(i))
        }
        page[this.id].values = values
    }
    
    selectedIndexes() {
        let arr = []
        for (var i = 0; i < this.values.length; ++i) {
            if (this.values[i].checked == true) {
                arr.push(i)
            }
        }
        return arr
    }
    
    get size() {
        if (Array.isArray(this.values)) {
            return this.values.length
        } else {
            return 0
        }
    }
    
    get isSelected() {
        if (this.selectedIndexes.length == 0) {
            return false
        } else {
            return true
        }
    }
}

class ListFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.dataSource = obj.dataSource || []
    }
    
    get length() {
        if (Array.isArray(this.dataSource)) {
            return this.dataSource.length
        } else {
            return 0
        }
    }
}

class GridFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.dataSource = obj.dataSource || []
    }
    
    get length() {
        if (Array.isArray(this.dataSource)) {
            return this.dataSource.length
        } else {
            return 0
        }
    }
}

class ScrollFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.dataSource = obj.dataSource || []
    }
    
    get length() {
        if (Array.isArray(this.dataSource)) {
            return this.dataSource.length
        } else {
            return 0
        }
    }
}

class IconFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.src = obj.src || []
    }
}

class WeuiSwitchModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        if (obj.hasOwnProperty("checked")) {
            this.checked = obj.checked
        } else {
            this.checked = false
        }
        this.title = obj.title || "开关"
    }
    
    updateValue(page, e) {
        this.checked = e.detail.value
    }
}

class WeuiTimePickerModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.title = obj.title || "时间"
        this.value = obj.value || "12:00"
        this.start = obj.start || "00:00"
        this.end = obj.end || "23:59"
    }
    
    updateValue(page, e) {
        page[this.id].value = e.detail.value
    }
}

class WeuiDatePickerModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.title = obj.title || "日期"
        this.value = obj.value || "2019-05-09"
        this.start = obj.start || "2019-01-01"
        this.end = obj.end || "2024-12-31"
        this.fields = obj.fields || "day"
    }
    
    updateValue(page, e) {
        page[this.id].value = e.detail.value
    }
}

class WeuiRegionPickerModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.title = obj.title || "地区"
        this.value = obj.value || []
    }
    
    updateValue(page, e) {
        page[this.id].value = e.detail.value
    }
}

class WeuiMultiSelectorPickerModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.title = obj.title || "自定义"
        this.range = obj.range || []
        this.value = obj.value || []
    }
    
    updateValue(page, e) {
        page[this.id].value = e.detail.value
    }

    get selectedValues() {
        return this.value.map((element, index) => {
            return this.range[index][element];
        });
    }

    get selectedValue() {
        return this.range[0][this.value];
    }
}

class ChartFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.chart = obj.chart || {}
    }
}

class ScrollTabFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.navData = obj.navData || {}
        this.option = obj.option || {}
        this.currentTab = obj.currentTab || 0
    }
    
    updateValue(page, e) {
         this.__target__.currentTab = e.detail.currentTab
    }
}

class ComponentFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                this[k] = obj[k]
            }
        }
    }
}

class StackViewFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.state = obj.state || ""
    }
}

class BannerFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                this[k] = obj[k]
            }
        }
    }
}

class SliderFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.activeColor = obj.activeColor || "#1aad19"
        this.backgroundColor = obj.backgroundColor || "#e9e9e9"
        this.min = obj.min || 0
        this.max = obj.max || 100
        this.step = obj.step || 1
        this.showValue = obj.showValue || 0
        this.value = obj.value || 0
    }
}

class ProgressFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.percent = obj.percent || 0
        this.backgroundColor = obj.backgroundColor || "#e9e9e9"
        this.activeColor = obj.activeColor || "#1aad19"
        this.active = obj.active || false
        this.strokeWidth = obj.strokeWidth || 6
        this.showInfo = obj.showInfo || false
    }
}
class CanvasFlexModel extends BaseFlexModel {
    constructor(obj) {
        super(obj)
        this.width = obj.width || 375
        this.height = obj.height || 375
        this.redraw = obj.redraw || false
    }
    updateValue(context, e) {
   }
}



module.exports = {
    BaseFlexModel,
    ViewFlexModel,
    ButtonFlexModel,
    ImageViewFlexModel,
    LabelFlexModel,
    InputFlexModel,
    TextareaFlexModel,
    VideoFlexModel,
    SwitchFlexModel,
    SwiperFlexModel,
    ListFlexModel,
    GridFlexModel,
    IconFlexModel,
    WeuiInputModel,
    WeuiTextareaModel,
    WeuiRadioModel,
    WeuiCheckboxModel,
    WeuiTimePickerModel,
    WeuiDatePickerModel,
    WeuiRegionPickerModel,
    WeuiMultiSelectorPickerModel,
    WeuiSwitchModel,
    ScrollFlexModel,
    ChartFlexModel,
    ScrollTabFlexModel,
    ComponentFlexModel,
    StackViewFlexModel,
    BannerFlexModel,
    SliderFlexModel,
    ProgressFlexModel,
    CanvasFlexModel
}
