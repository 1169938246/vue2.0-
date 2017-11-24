<template>
	<div>
	<div class="shopcart">
		<div class="mui-content ">
			<div class="mui-row">
				<div class="mui-col-xs-9 mui-col-sm-9 addList"@click.stop.prevent="addList">
					<div class="logo-warpper">
						<div class="logo"   :class="{'heightlight':totalCount>0}">
							<i class="logo-shopp" :class="{'heightlight':totalCount>0}"><img src="../../assets/gouwuche.png"width="24px"height="24px"></i>
						</div>
						<div class="logoCount" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price2" :class="{'priceText':totalPrice>0}"style="color: white;">
						￥{{totalPrice}}
					</div>
					<div class="dese2"><span>另外需要配送费￥{{deliveryPrice}}元</span></div>
				</div>
				<div class="mui-col-xs-3 mui-col-sm-3">
					<div class="minPrice" :class="payClass">
						<span>{{payment}}</span>
					</div>
				</div>
				
			</div>
		</div>
		 <div class="list-conten"  >
	
  <transition name="fade">
<div class="list-mian"v-show="listShop">
	<div class="list-header">
	<div class="mui-row">
		<div class="mui-col-xs-8  mui-col-sm-8">
			<span>已选商品</span></div>
		<div class="mui-col-xs-4 mui-col-sm-4" @click="empty">
			<span class="default"><img src="../../assets/shanchu.png" style="vertical-align: middle;"/>清空</span></div>
	</div>
</div>
<div ref="listCroll" >
	<ul class="mui-table-view" >
		<li v-for="food in selectFoods" class="mui-table-view-cell">
			<div class="mui-row">
				<div class="mui-col-xs-6 mui-col-sm-6 list-text">
					<span class="name">{{food.name}}</span>
					
				</div>
				<div class="mui-col-xs-6 mui-col-sm-6 shop-right">
					
					<div class="cartcontrol">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<span class="price3">
						￥{{food.price*food.count}}
					</span>
				</div>
			</div>
		</li>
	</ul>
	</div>
</div>
</transition>
		 	
		 </div>
	
		
		
	</div>
	</div>
</template>

<script>
	  import BScroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol';
	
	export default{
		data(){
			return {
				
			fold:true
			}
		},
		   props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price:"30",
              count: 1
            }
          ];
        }
      },
			deliveryPrice:{
				type:Number,  /*配送费*/
				defalut:0
			},
			minPrice:{
				type:Number,
				default:0  /*起步费*/
			}
		},
		computed:{
			totalPrice(){
				 let total = 0;
        this.selectFoods.forEach((food) => {/*编辑goods页面传过来的每一项price和count*/
          total += food.price * food.count;
        });
        return total;/*总价格*/
				
				
				
			},
			totalCount(){
				 let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
			},
		 payment(){
		 	if(this.totalPrice===0){
		 		return `￥${this.minPrice}元起送`;
		 	}else if(this.totalPrice<this.minPrice){
		 		let dif=this.minPrice-this.totalPrice;
		 		return 	`还差￥${dif}元起送`;
		 	}else{
		 		return '去结算';
		 		
		 	}
		 },
		 payClass(){
		 	if(this.totalPrice<this.minPrice){
		 	  return 'payse'
		 	}else{
		 		return 'payss'
		 	}
		 },
		 listShop(){
		 	if(!this.totalCount){
		 		this.fold=true;
		 		return false;
		 	}
		 	
		 	 	let show=!this.fold;
		 	 
		 	 	if(show){
		 	 		
		 	 		this.$nextTick(() => {
		 	 			if(!this.scroll){
		 	 				this.scroll=new BScroll(this.$refs.listCroll,{
		 	 				
		 	 					click:true
		 	 				
		 	 			})
		 	 				
		 	 			}else{
		 	 				this.scroll.refresh();
		 	 			}
		 	 			
		 	 		
		 	 		});
		 	 	}
		 	 		return show;
		 	
		 }
		
		},
		components:{
			cartcontrol
		},
		methods:{
			addList(){
				
				 if (!this.totalCount) {
       return;
     }
     this.fold = !this.fold;
      },
		hiddenList(){
			this.fold=this.true;
		},
		empty(){
			
			this.selectFoods.forEach((food) =>{
				food.count=0;
			});
		}
    
		}
		
	}
</script>

<style >
	.mui-content{
		background: black;
	}
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
		background-color:black;
	}
	.logo-warpper{
		display: inline-block;
		width: 56px;
		height: 56px;
		border-radius: 27px;
	position: relative;
	top: -10px;
	margin: 0 12px;
	padding: 6px;
		background-color: black;
	
	}
	.logo{
		  background: #2b343c;
		  height: 100%;
		  width: 100%;
		  border-radius: 50%;
		 text-align: center;
		 
		 
	}
	.logoCount{
		position: absolute;
		width: 30px;
		height:20px;
		background: red;
		top: 0;
		right: -6px;
		font-size: 9px;
		line-height: 20px;
		border-radius: 15px;
		color: white;
		text-align: center;
        box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
      
	}
	.logo-shopp{
		line-height:50px;
		font-size: 24px;
		
	}
	.heightlight{
	background-color:#00BFFF !important;
	color: #FFFF00;
	}
	.price2{
		 color: rgba(255,255,255,0.4);
		 display: inline-block;
		 vertical-align: top;
		 margin-top: 10px;
		 border-right: 1px solid rgba(255, 255, 255, 0.1);
		 padding-right: 12px;
		 font-size: 16px;
		 font-weight: bold;
		 line-height: 30px;
	}
	.dese2{
		display: inline-block;
		 color: rgba(255,255,255,0.4);
		 vertical-align: top;
		 margin-top: 10px;
		 margin-left: 5px;
		 font-size: 10px;
		 line-height:30px;
		
	}
	.minPrice{
		text-align: center;
		width: 100%;
		line-height: 48px;
		 color: rgba(255,255,255,0.4);
		 font-size: 12px;
		 font-weight:bold;
		 background:#2b333b;
	}
	 &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
.priceText{
	color: white !important;
}
.payse{
	background: #2b333b;
}
.payss{
	background: #00b43c;
	color: white;
}
/*.list-conten{
	position: fixed;
	height: 100%;
	width: 100%;
	background: rgba(204, 204, 204, 0.41);
	
	z-index: -2;
	top: 0;
	left: 0;
	
}*/

.list-mian{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	max-height: 300px;
 transform: translate3d(0, -100%, 0);
	background: white;
	z-index: -1;
}

.list-header{
	font-size: 12px;
	text-align: center;
	height: 30px;
	line-height: 30px;
}
.list-header .default{
	float: right;
	padding-right: 10px;
}
.list-text{
	text-align: center;
}
.name{
	font-size: 16px ;
	text-align: center;
	line-height: 30px;
}
.price3{
display: inline-block;
margin-top: 4px;
font-size: 20px;
float: right;
}
.cartcontrol{
	display: inline-block;
	float: right;
	
}
 .fade-enter-active, .fade-leave-active{
 	 transition: all 0.5s
 }
       
      .fade-enter, .fade-leave-active{
      	transform: translate3d(0,0,0);
      }
      
</style>
