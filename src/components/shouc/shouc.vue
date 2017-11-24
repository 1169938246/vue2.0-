<template>
<div class="shouc">
	
	

<div class="favorite" @click="toggleFavorite">
		  		<span class="icon-favorite" :class="{'active':favorite=true}"></span>
		  		<span class="favorite-text">{{favoriteText}}</span>
		  	</div>
		  	</div>
		  	</template>
<script>
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				favorite:false
			}
		},
		methods:{
			toggleFavorite(){
				this.favorite=!this.favorite;
			}
		},
		computed:{
    		favoriteText(){
    			return this.favorite?"已收藏":"收藏";
    		}
    	},
		
		
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	 @import "../../common/stylus/mixin.styl"
	 .favorite{
        	position: absolute;
        	right: 0;
        	top: 35px;
        	margin-right: 25px;
        }
       
     .active{
     color: red !important;
     }
        
         .icon-favorite{
        	  display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: 24px
          color: #d4d6d9
        }
        .favorite-text{
        	line-height: 10px;
        	font-size: 10px;
        	color: rgb(77,85,93);
        }
</style>