<template>
	<div class="goods">
		 <div class="goods_warpper mui-scroll-wrapper" style="left: 0;" ref="menuWrapper">
		 	
		 <ul class="mui-table-view">
		 <li v-for="(item,parentIndex) in goods" class="mui-table-view-cell list" @click="seltMenu(parentIndex,$event)":class="{'current':parentIndex===currentIndex}">
		 	<span class="text ">
		 		
		 		{{item.name}}
		 		
		 	</span>
		 
		 </li>
		 </ul>
		
		 
		 </div>
		 <div class="goods_foods mui-scroll-wrapper" ref="foodsWrapper">
		
		   <ul class="mui-table-view">
		   	<li v-for="(item,parentIndex) in goods" class="foot-list-hook" ref="foodList" >
		   		<span class="atitle fort">{{item.name}}</span>
		   		<ul class="mui-table-view"style="background: white;">
		   			<li  v-for="food in item.foods" class="mui-table-view-cell item" name="list"@click="selectFood(food,$event)">
		   				<div class="icon"><img :src="food.icon" width="57"height="57"></div>
		   				<div class="content">
		   				<div class="content mui-media-body">
		   					<h4 class="aname">{{food.name}}</h4>
		   					<p class="dese mui-ellipsis">{{food.description}}</p>
		   				</div>
		   				<div class="extar">
		   					<span>月售{{food.sellCount}}</span>
		   					<span class="hot">好评率{{food.rating}}%</span>
		   				</div>
		   				<div class="price">
		   					<span class="now">￥{{food.price}}</span>
		   					<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
		   				</div>
		   				<div class="cartcontrol-wrapper">
		   					<cartcontrol :food="food">
		   						
		   					</cartcontrol>
		   				</div>
		   				</div>
		   			</li>
		   		</ul>
		   	</li>
		   	
		   </ul>
		
		 </div>
		 <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="Foods"></shopcart>
		 <food :food="selectedFood" ref="food"></food>
	</div>
</template>

<script>
 
 import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
import cartcontrol from '../cartcontrol/cartcontrol';
import food from '../food/food';
	const odd_ok=0;
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				goods:[],
				listHeight:[],
				 scrollY:0,
				 selectedFood:{}
				
					
				
			}
		},
		 components: {
      shopcart,
      cartcontrol,
      food
    
   },
		computed:{
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];      /*上区间高度0
					                                          1009
                                                              1148
                                                              1266
                                                              1568
                                                              1778
                                                              2009
                                                               2311
                                                               2797
                                                               3480*/
					let height2=this.listHeight[i+1];
					if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
						
						return i;
						
					}
					
				}
				return 0;
			},
			Foods(){/*给shopcart页面传递数据*/
				let foods=[];
				this.goods.forEach((add) => {/*遍历goods存在的分类商品*/
				
					add.foods.forEach((food) => {/*遍历所有分类商品每一项*/
						if(food.count){
							foods.push(food);
						}
						
						
						
						
					})
					
					
					
				});
				return foods;
			}
		},
	
		
		created(){
				
    
			this.$http.get("/api/goods").then((response) => {
				
				response=response.body;
				if(response.errno===odd_ok){
					this.goods=response.data;
				this.$nextTick( () => {

this._initScroll();/*调用函数  这样才能拿到内存高度*/
    this._calHeight();/**/
   

						
						
					});
				}
				
				
				
				
			});
			
			
		
			
		},
		
	  methods:{
	  	selectFood(food,event){
	 	 if(!event._constructed){
	 	 	return 
	 	 	
	 	 }
	 	 this.selectedFood=food;
	 	 this.$refs.food.show();
	 },
	  	_calHeight(){
	  	 let foodList=this.$refs.foodsWrapper.getElementsByClassName("foot-list-hook");/*获取li个数*/;
	 
	  		let height=0;/*定义一个初始化高度*/
	  		this.listHeight.push(height);/*将第一个区域高度进去*/
	  		for(let i=0;i<foodList.length;i++){
	  			let item=foodList[i];
	  			height+=item.clientHeight;/*得到每个区间的高度*1009
 139
 118
 302
 210
 231
302
 486
 683 */
	  			this.listHeight.push(height);/*listHeight构造完成，对应每个区间高度(2) [0, 1009, __ob__: Observer]0: 01: 10092: 11483: 12664: 15685: 17786: 20097: 23118: 27979: 3480length: 10__ob__: Observer__proto__: Array
goods.vue?3e8b:155 (3) [0, 1009, 1148, __ob__: Observer]0: 01: 10092: 11483: 12664: 15685: 17786: 20097: 23118: 27979: 3480length: 10__ob__: Observer__proto__: Array
goods.vue?3e8b:155 (4) [0, 1009, 1148, 1266, __ob__: Observer]
goods.vue?3e8b:155 (5) [0, 1009, 1148, 1266, 1568, __ob__: Observer]
goods.vue?3e8b:155 (6) [0, 1009, 1148, 1266, 1568, 1778, __ob__: Observer]
goods.vue?3e8b:155 (7) [0, 1009, 1148, 1266, 1568, 1778, 2009, __ob__: Observer]
goods.vue?3e8b:155 (8) [0, 1009, 1148, 1266, 1568, 1778, 2009, 2311, __ob__: Observer]
goods.vue?3e8b:155 (9) [0, 1009, 1148, 1266, 1568, 1778, 2009, 2311, 2797, __ob__: Observer]
goods.vue?3e8b:155 (10) [0, 1009, 1148, 1266, 1568, 1778, 2009, 2311, 2797, 3480, __ob__: Observer]*/
	  	
	  			
	  		}
	  	
	  		
	  	},
	     _initScroll(){
	     	this.nmeuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true   
                                
        });/*bettor scroll方法获取Dom  menuWrapper */

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3     /*better-scroll接口  实时监听滚动条位置*/
        });
         
        this.foodsScroll.on('scroll',(pos) => {
        	this.scrollY=Math.abs(Math.round(pos.y));/*把Y坐标变成正整数 并监控滚动条的位置*/
        
        });
        
	     },
	     seltMenu(parentIndex,event){
	      if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[parentIndex];    /*点击左侧 右侧联动*/
        this.foodsScroll.scrollToElement(el, 300);
             
      },
  
	    
	   
	  },
	 
	
	};
	
	
</script>

<style lang="stylus" rel="stylesheet/stylus">
	
	@import url("/common/stylus/mixin");
	.goods{
		display: flex;
		position: absolute;
		top: 187px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		
		
	}
	.goods_warpper{
		flex: 0 0 80px;
		width: 80px;
		background-color: white !important;
		
	}
	.goods_foods{
		flex: 1;
		
	}
	.text{
	
	height: 24px;
	line-height: 24px;
	
	

	}
	
	
.mui-table-view{
	font-size: 12px;
}
.mui-table-view{
	background: #F3F3F3;
}
*{
	list-style-type: none;
}
.icon{
	flex: 0 0 57px;
	margin-right: 10px;
}
.item{
	display: flex;
}
.content{
	flex: 1;
	position: relative;
	
}
.atitle{
	padding-left: 14px;
	height: 26px;
	line-height: 26px;
	font-size: 12px;
	color:black;
	background: #f3f5f7;

	
}
.aname{
	font-size: 12px;
	line-height: 14px;
	height: 14px;
	color:rgb(7,17,27);
	
}
.price{
	font-weight: bold;
	line-height: 24px;
}
.now{
	font-size: 14px;
	margin-right: 8px;
  color: rgb(240,20,20);
}
.old{
	color: rgb(147,153,149);
	font-size: 12px;
}
 
 .mui-scroll-wrapper{
 	left: 80px;
 }                
            
.mui-scrollbar {
            display: none !important;
        }
        .dese{
        	font-size: 12px;
        	width: 100px;
        }
        .hot{
        	margin-left: 12px;
        }
  .current{
  	background-color: white;
  	position: relative;
  	margin-top: -1px;
  	border-top: 1px solid #CCCCCC;
  	transform: scale(1.2);
  }
  .cartcontrol-wrapper{
  	position: absolute;
  	bottom: 10px;
 
  
  
  	right:66px;
  }
 

</style>