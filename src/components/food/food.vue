<template>
	 <transition name="culd">
	<div class="food" v-show="showFlag" ref="foodTogg">
		<div class="food-content">
			<div class="image-header">
				
				<img :src="food.image" class="food-img"/>
				<div class="back" @click="back">
				<img src="../../assets/fanhui.png"  class="back-arrow"/>
				</div>
			</div>
				<div class="food-text">
		   				<div class="content mui-media-body">
		   					<h2 class="aname">{{food.name}}</h2>
		   					<p class="dese mui-ellipsis">{{food.description}}</p>
		   				</div>
		   				<div class="food-extar">
		   					<span>月售{{food.sellCount}}</span>
		   					<span class="hot">好评率{{food.rating}}%</span>
		   				</div>
		   				<div class="food-price">
		   					<span class="food-now">￥{{food.price}}</span>
		   					<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
		   					<div class="cartcontrol-wrapper "style="right: 10px;position: absolute;top: -10px;">
		   					<cartcontrol :food="food">
		   						
		   					</cartcontrol>
		   				</div>
		   				</div>
				</div>
				
				
				
		   				
		   				
		   			<splice v-show="food.info"></splice>
		
		<div class="food-describe" v-show="food.info">
		<div class="food-title">商品介绍</div>
			<div class="food-info">{{food.info}}</div>
			
		</div>
				<splice></splice>
				<div class="rathing">
					<div class="food-title" >商品评价
				<span class="food-span"@click=" showLiner">查看全部评价</span>
				<All :food="food" ref="Alld"></All>
					</div>
				
				</div>
				
				<div class="food-waring">
					<ul v-show="food.ratings&&food.ratings.length" style="padding-left: 0;">						
						<li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
							<div class="user">
								<span class="user-name">{{rating.username}}</span>
								<img width="12"height="12" class="avatar" :src="rating.avatar">
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<p class="status-text">
<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" class="stasus-icon"></span>
                         {{rating.text}}

							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings ||food.ratings.length"></div>
				</div>
				
				
				
				
		</div>
	</div>						
	</transition>
</template>

<script>
	import Vue from 'vue';
	import cartcontrol from '../cartcontrol/cartcontrol';
	 import BScroll from 'better-scroll';
	 import splice from '../splice/splice';
	  import {formatDate} from '../../common/js/date.js';
	  import All from '../All/All'
	
	 const ONE=0;
	const NEXT=1;
	const ALL=2;
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return{
				showFlag:false,
				selectType:ALL,
				onlyContent:true,
				desc:{
					all:"全部",
						positive:'推荐',
						nextive:"吐槽"
				}
				
				
			};
			
		},
		
		methods:{
		show(){
			this.showFlag=true;
			this.selectType=ALL;
			this.onlyContent=false;
			
			  this.$nextTick(() => {
                 if (!this.scroll) {
                   this.scroll = new BScroll(this.$refs.foodTogg, {
                         click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
		},
		back(){
			this.showFlag=false;
			
		},
		needShow(type,text){
			if(this.onlyContent && !text){
				return false
			}
			if(this.selectType ===ALL){
				return true
			}else{
				return type=this.selectType
			}
		},
		  selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      showLiner(event){
      	this.$refs.Alld.showAll();
      }
    
      	
		
	},
	components:{
		cartcontrol,
		splice,
		
		All
	},
	filters:{
		formatDate(time){
			let date=new Date(time);
			return formatDate(date,'yyyy-MM-dd hh:mm');
		}
		
	}
	
	};
	
	
</script>

<style>
	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		
		background: white;
		transform: translate3d(0,0,0);
		 transition: all 0.2s linear
	}
	
       
      .culd-enter, .culd-leave{
      	transform: translate3d(100%,0,0);
      }
      .image-header{
      	width: 100%;
      	height: 0;
      	position: relative;
      	padding-top: 100%;
      }
     .food-img{
      	width: 100%;
      	height: 100%;
      	position: absolute;
      	top: 0;
      	left: 0;
      }
      .back{
      	position: absolute;
      	top: 10px;
      	left: 0;
      	
      
      }
      .back-arrow{
      	display: block;
      	color: white;
      	font-size: 20px;
      	padding: 10px;
      
      }
      .food-text{
      	padding: 18px;
      
      
      }
    .food-extar{
    font-size: 14px;
     margin-top: 5px;
     color: #CCCCCC;
    }
   .food-price{
   	margin-top: 10px;
   	color: red;
   	font-size: 15px;
   	position: relative;
   }
    .food-now{
    	font-size: 16px;
    	margin-top: 10px;
    }
 
  .food-css{
  	height: 30px;
  	border-top: 1px solid #CCCCCC;
  	width: 100%;
  	background:rgba(204, 204, 204, 0.34);
  	border-bottom: 1px solid #CCCCCC;
 

  }
  .food-describe{
  	width: 100%;
  	height: auto;
  	overflow: hidden;
  	
  	
  }
  .food-info{
  	padding: 18px;
  	font-size: 12px;
  	color:#4d555d;
  }
  .food-title{
  padding-left: 10px;
  padding-top: 10px;
  font-size: 14px;
  color: #2B333B;
  	
  }
  .user{
  	display: inline-block;
  	float: right;
  }
  .avatar{
  	border-radius: 50%;
  }
  .food-waring{
  	padding: 0 18px;
  }
  .rating-item{
  	padding: 16px 0;
  	position: relative;
  	border-bottom: 1px solid #CCCCCC;
  }
  .user-name{
  	font-size: 12px;
  	 color: rgb(147, 153, 159)
  }
  .status-text{
  	font-size: 12px;
  	line-height: 16px;
  	color: rgb(7, 17, 27);
  	vertical-align:middle;
  }
   .icon-thumb_up{
   	  color: rgb(0, 160, 220);
   	 
   }
            
            .icon-thumb_down{
            	 color: rgb(147, 153, 159)
            }
     .stasus-icon{
     	font-size: 18px;
     	vertical-align: middle;
     	margin-right: 4px;
     	line-height: 16px;
     
     }
        .time{
        	margin-bottom: 6px;
        	line-height: 12px;
        	font-size: 10px;
        	color: rgb(147,153,159);
        }   
        .food-span{
        	font-size: 12px;
        	float: right;
        	margin-right: 10px;
        		
        }  
</style>