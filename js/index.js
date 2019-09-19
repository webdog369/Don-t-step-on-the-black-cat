$(function () {

    //开始游戏
    startGame();
    //绘制五组方块
    let $map = $(".map");
    for (let i = 0 ; i <= 4; i++){
        setBlock($map);
        ($(".group").eq(4).children(".bgColor")).addClass("startBtn")
    }
    //方块位置初始化
    groupPosition();

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

//游戏音效
function music() {
    //找到所有音效 并设置一个0-5的随机数
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

    //利用事件委托给方块添加点击事件
    $("body").on("click",".block",function () {

        //方块颜色判定
        if ($(this).hasClass("bgColor") && $(this).parent().index() === 4 ){
               //生成新的一组方块 并且初始化位置
                setBlock($map);
               groupPosition();

                //设置被点击的方块变成灰色时添加盒子阴影 并让其所在的方块组下移25%
                $(this).css({
                    backgroundColor:"#ddd",
                    boxShadow:`inset ${0} ${0} ${200}px #000`
                });
                $(this).parent().slideUp(100);

            //点击事件发生时播放游戏音效
            music();

            //加分
            score += 1;

            //0.5s后删除刚才点击过的方块(优化性能)
            let _this = $(this);
            setTimeout(function () {
                _this.parent().remove();
            },500);

         return score;
        }
        //设置无法点击非最后一排的黑色方块(优化用户体验)
        else if ($(this).hasClass("bgColor") && $(this).parent().index() !== 4){
            return  false;
        }
        else {
            //若点击了非黑色方块 则方块变为红色
            $(this).addClass("miss");

            //给地图加入红色内阴影
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
            ($(".group").eq(4).children(".bgColor")).addClass("startBtn")
        }

        //去除地图内阴影

        $map.css("boxShadow","none");

        //初始化方块位置
        groupPosition();
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
