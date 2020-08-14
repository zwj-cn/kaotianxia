<?php
    header('content-type:text/html;charset=utf8');
    $name=$_POST["name"];
    $con=mysqli_connect('localhost','root','root','test');
    $res=mysqli_query($con,"select*from user where name='$name'");
    $row=mysqli_fetch_assoc($res);
    if($row){
        echo "no";
    }
    