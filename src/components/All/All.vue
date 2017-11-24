<template>
 <transition name="culd">
	<div class="All" v-show="All" ref="All">
		<div class="back" @click="backAll">
				<img src="../../assets/fanhui.png"  class="back-arrow"style="color: black;"/>
				</div>
		<div class="food-title"style="text-align:center;" >商品评价</div>
		<div class="food-waring">
					<ul v-show="food.ratings&&food.ratings.length" style="padding-left: 0;">						
						<li v-for="rating in food.ratings" class="rating-item" >
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
</transition>
</template>

<script>
	import Vue from 'vue';
	  import {formatDate} from '../../common/js/date.js';
	  import BScroll from 'better-scroll';
	
	export default{
		
		props:{
		food:{
			type:Object
		}
		},
		data(){
			return{
				All:false
			}
		},
		methods:{
			
			showAll(){
				window.scrollTo(0,0)
				this.All=true;
				
				  this.$nextTick(() => {
                 if (!this.scroll) {
                   this.scroll = new BScroll(this.$refs.All, {
                         click: true,
                         
            });
          } else {
            this.scroll.refresh();
          }
        });
			},
			backAll(){
				this.All=false;
			}
		},
		filters:{
		formatDate(time){
			let date=new Date(time);
			return formatDate(date,'yyyy-MM-dd hh:mm');
		}
		
	},
	 created(){
	
	 
	 }
		
		
		
		
	}
</script>

<style>
	.culd-enter, .culd-leave{
      	transform: translate3d(100%,0,0);
      }
      .All{
      	position: fixed;
		left: 0;
		top: 0px;
		bottom:0;
		z-index: 30;
		width: 100%;
		
		background: white;
		transform: translate3d(0,0,0);
		 transition: all 0.2s linear
      }
</style>