<?php
    header('content-type:text/html;charset=utf8');
    $name=$_POST["name"];
    $ge=$_POST["ge"];
    $diqu=$_POST["diqu"];
    $work=$_POST["work"];
    $sex=$_POST["sex"];
    $ming=$_POST["ming"];
    $tou=$_POST["touurl"];
    $con=mysqli_connect('localhost','root','root','test');
    $res=mysqli_query($con,"select*from user where username='$name'");
    $row=mysqli_fetch_assoc($res);
    if($row){
        if($diqu){
            $sql=mysqli_query($con,"update user set diqu='$diqu' where username='$name'");
        }
        if($ge){
            $sql=mysqli_query($con,"update user set ge='$ge' where username='$name'");
        }
        if($work){
            $sql=mysqli_query($con,"update user set work='$work' where username='$name'");
        }
        if($sex){
            $sql=mysqli_query($con,"update user set sex='$sex' where username='$name'");
        }
        if($ming){
            $sql=mysqli_query($con,"update user set name='$ming' where username='$name'");
        }
        if($tou){
            $sql=mysqli_query($con,"update user set tou='$tou' where username='$name'");
        }
    }