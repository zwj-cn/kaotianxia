<?php
    header('content-type:text/html;charset=utf8');
    $username=$_POST["username"];
    $con=mysqli_connect('localhost','root','root','test');
    $res=mysqli_query($con,"select*from user where username='$username'");
    $row=mysqli_fetch_assoc($res);
    if($row){
        echo "no";
    }
    