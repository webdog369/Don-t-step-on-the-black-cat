$(function () {
    //开始游戏
    startGame();
    //绘制五组方块
    let $map = $(".map");
    for (let i = 0 ; i <= 4; i++){
        setBlock($map);
    }
    //方块位置初始化
    groupPosition();

    //给要点击的方块设置引导手势
    ($(".group").eq(3).children(".bgColor")).addClass("startBtn");

    //底部方块组初始化
    bottomStyle();

    //方块点击检测
    checkBlock($map);
});

//开始游戏
function startGame() {
    //找到开始界面
    let $start = $("#start");
    //找到帮助按钮
    let $helpBtn = $(".helpBtn");
    //找到帮助菜单
    let $help = $(".help");
    //点击帮助按钮时显示帮助菜单
    $helpBtn.click(function () {
        $help.fadeIn(500);
        $help.click(function () {
            $(this).slideUp(300);
        })
    });
    //点击开始按钮时隐藏开始界面 并随机播放一个音效
    $(".start").click(function () {
        //让开始界面下滑消失
        $start.slideUp();
        music();
    })
}

//底部方块组初始化
function bottomStyle() {
    //设置随机颜色
    let max = 100;
    let min = 0;
    let rand1 = parseInt(Math.random() * (max - min + 1) + min);
    let rand2 = parseInt(Math.random() * (max - min + 1) + min);
    let rand3 = parseInt(Math.random() * (max - min + 1) + min);
    //边框颜色取反色
    let invert1 = 255 - rand1;
    let invert2 = 255 - rand2;
    let invert3 = 255 - rand3;
    let $bottomBlock = $(".group").eq(4).children();
    ($bottomBlock .css("background",`rgb(${rand1},${rand2},${rand3})`));
    ($bottomBlock .css("borderColor",`rgb(${invert1},${invert2},${invert3})`));
    ($bottomBlock .eq(0).text("别"));
    ($bottomBlock .eq(1).text("踩"));
    ($bottomBlock .eq(2).text("小"));
    ($bottomBlock .eq(3).text("黑"));
}

//生成一组方块的方法
function setBlock($map) {
        $map.prepend("<div class='group'>" +
            "<div class='block'></div>" +
            "<div class='block'></div>" +
            "<div class='block'></div>" +
            "<div class='block'></div>" +
            "</div>");
        let max = 3;
        let min = 0;
        let rand = parseInt(Math.random() * (max - min + 1) + min);
        let $thisBlock = $(".group").children().eq(rand);
        $thisBlock.addClass("bgColor");

}

//方块组位置初始化
function groupPosition() {
    let $group = $(".group");
    $group.eq(4).css("bottom","0%");
    $group.eq(3).css("bottom","25%");
    $group.eq(2).css("bottom","50%");
    $group.eq(1).css("bottom","75%");
    $group.eq(0).css("bottom","100%");
}

//点击后更新方块组位置
function groupPosition2() {
    let $group = $(".group");
    $group.eq(5).css("bottom","-25%");
    $group.eq(4).css("bottom","0%");
    $group.eq(3).css("bottom","25%");
    $group.eq(2).css("bottom","50%");
    $group.eq(1).css("bottom","75%");
    $group.eq(0).css("bottom","100%");
}

//游戏音效
function music() {
    //找到所有音效 并设置一个0-6的随机数
    let max = 6;
    let min = 0;
    let rand = parseInt(Math.random() * (max - min + 1) + min);
    let $music = $("audio");
    //找到一个随机音效
    let currentMusic =$music.get(rand);
    //播放随机音效(调用cloneNode()使音效可以叠加)
    currentMusic.cloneNode().play();
}

//方块检测方法
function checkBlock($map) {
    //设置初始分数
    let score = 0;


    //设置方块变色备用值
    let num = 220;
    let num2 = 0;
    let num3 = 80;
    let num4 = 255;
    let $textItem = $(".textItems");

    //利用事件委托给方块添加点击事件
    $("body").on("click",".block",function () {

        //方块颜色判定
        if ($(this).hasClass("bgColor") && $(this).parent().index() === 3 ){
               //生成新的一组方块
                setBlock($map);
              // 初始化位置
               groupPosition2();

            //点击事件发生时播放游戏音效
            music();

            //加分
            score += 1;
            //让方块随着分数的增高先变黄再变红后变蓝
            if(score < 110 ){
                let $block = $(".group").children(".bgColor");
                $block.css("background",`rgb(${score*2},${score*2},${0})`);
                if (score === 50){
                    $textItem.eq(0).fadeIn();
                    setTimeout(function () {
                        $textItem.eq(0).fadeOut();
                    },2000)
                }
            }
            else if (score >= 110 && score < 180) {
                let $block = $(".group").children(".bgColor");
                num -= 2;
                $block.css("background",`rgb(${score*2},${num},${0})`);
                if (score === 150){
                    $textItem.eq(1).fadeIn();
                    setTimeout(function () {
                        $textItem.eq(1).fadeOut()
                    },2000)
                }
            }
            else if (score >= 180 && score <= 280) {
                let $block = $(".group").children(".bgColor");
                num2 += 2;
                num3 -= 2;
                num4 -= 6;
                $block.css("background",`rgb(${num4},${num3},${num2})`);
                if (score === 265){
                    $textItem.eq(3).slideDown();
                    setTimeout(function () {
                        $textItem.eq(3).slideUp();
                        $textItem.eq(4).slideDown();
                        setTimeout(function () {
                            $textItem.eq(4).slideUp();
                            $textItem.eq(5).slideDown();
                            setTimeout(function () {
                                $textItem.eq(5).slideUp();
                                $textItem.eq(6).fadeIn();
                                setTimeout(function () {
                                    $textItem.eq(6).fadeOut();
                                },8000)
                            },3000)
                        },3000)
                    },4000);
                }
            }
            //如果玩家分数超过280 则会开启彩虹模式
            else {
                if (score === 450){
                    $textItem.eq(7).fadeIn();
                    setTimeout(function () {
                        $textItem.eq(7).fadeOut();
                        $textItem.eq(8).fadeIn();
                        setTimeout(function () {
                            $textItem.eq(8).fadeOut();
                            $textItem.eq(9).fadeIn();
                            setTimeout(function () {
                                $textItem.eq(9).fadeOut();
                                setTimeout(function () {
                                    $textItem.eq(10).fadeIn();
                                    setTimeout(function () {
                                        $textItem.eq(10).fadeOut();
                                    },5000)
                                },5000)
                            },5000)
                        },3000)
                    },4000)
                }
                //随机颜色
                let max = 200;
                let min = 0;
                let maxIndex = 0;
                let minIndex = 3;
                let randIndex = parseInt(Math.random() * (maxIndex - minIndex + 1) + minIndex);
                let rand1 = parseInt(Math.random() * (max - min + 1) + min);
                let rand2 = parseInt(Math.random() * (max - min + 1) + min);
                let rand3 = parseInt(Math.random() * (max - min + 1) + min);
                let $randBlock = $(".group").eq(randIndex).children(".bgColor");
                $randBlock.css("background",`rgb(${rand1},${rand2},${rand3})`);
            }

            //设置被点击的方块变成灰色时添加盒子阴影 并让其所在的方块组下移25%
            $(this).css({
                backgroundColor:"#ddd",
                // boxShadow:`inset ${0} ${0} ${200}px #000`
            });

            //0.5s后删除超出去的方块组(优化性能)
            setTimeout(function () {
                $(".group").eq(5).remove();
            },500);

         return score;
        }
        //设置无法点击非第三排的黑色方块和已经点过的方块(优化用户体验)
        else if (($(this).hasClass("bgColor") && $(this).parent().index() !== 3) || $(this).parent().index() === 4 ){
            return  false;
        }
        else {

            //若点击了非黑色方块 则出现生气的小黑
            $(this).addClass("miss");

            //给地图加入淡黄色内阴影
            $(".map").css("boxShadow",`inset ${0} ${0} ${300}px lightgoldenrodyellow`);

            //播放游戏失误音效
           let overMusic =  document.querySelector(".over");
           overMusic.play();

          //把最终得分添加到结束面板
          $("#score").text(score);

            //延迟0.5s出现结算界面
            setTimeout(function () {

              $("#over").slideDown();

              //重置分数
              score = 0;

          },500);

          //放置重新开始函数 等待用户调用
          restart();
        }
    });
}

//重新开始
function restart() {
    $(".restart").click(function () {
        //找到所有存在的方块组
        let $group = $(".group");

        //删除存在的方块组
        $group.remove();

        //关闭结束界面
        $("#over").slideUp();

        //重新绘制方块
        let $map = $(".map");
        for (let i = 0 ; i <= 4; i++){
            setBlock($map);
        }
        //去除地图内阴影

        $map.css("boxShadow","none");

        //漂浮文字位置归位
        let $textItems = $(".textItems");
        $textItems.hide();
        $textItems.css("left","100%");
        setTimeout(function () {
            $textItems.show();
        },8000);

        //初始化方块位置
        groupPosition();

        //给要点击的方块设置引导手势
        ($(".group").eq(3).children(".bgColor")).addClass("startBtn");

        //底部方块组初始化
        bottomStyle();
    })
}

//联系方式
(function () {
    console.log("作者:Mr.朱");
    console.log("qq:1136116938");
    console.log("GitHub地址:https://github.com/webdog369");
    console.log("本作品图片,音频素材来源于网络,非商用");
    console.log("版本号:v1.0");
})();
