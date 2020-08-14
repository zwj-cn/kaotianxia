<?php
    header('content-type:text/html;charset=utf8');
    $name=$_POST["name"];
    $number=$_POST["number"];
    $count=$_POST["count"];
    $con=mysqli_connect('localhost','root','root','test');
    $res=mysqli_query($con,"select*from user where username='$name'");
    $row=mysqli_fetch_assoc($res);
    if($row){
        $sql=mysqli_query($con,"update user set number='$number',count='$count' where username='$name'");
    }
    