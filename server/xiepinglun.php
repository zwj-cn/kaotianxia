<?php
    header('content-type:text/html;charset=utf8');
    $name=$_POST["name"];
    $xingnum=$_POST["xingnum"];
    $haohuai=$_POST["haohuai"];
    $text=$_POST["text"];
    $time=$_POST["time"];
    $tou=$_POST["tou"];
    $con=mysqli_connect('localhost','root','root','test');
    $sql=mysqli_query($con,"insert pinglun set name='$name',xingnum='$xingnum',ping='$haohuai',text='$text',time='$time',tou='$tou'");
    if($sql){
        echo "1";
    }else{
        echo "0";
    }