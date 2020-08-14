<?php
    header('content-type:text/html;charset=utf8');
    $username=$_POST["username"];
    $password=$_POST["password"];
    $name=$_POST["name"];
    $con=mysqli_connect('localhost','root','root','test');
    $res=mysqli_query($con,"select*from user where username='$username'");
    $res1=mysqli_query($con,"select*from user where name='$name'");
    $row=mysqli_fetch_assoc($res);
    $row1=mysqli_fetch_assoc($res1);
    if($row){
        echo "no1";
    }else{
        if($row1){
            echo "no2";
        }else{
            $sql=mysqli_query($con,"insert user(username,password,name) values('$username','$password','$name')");
            if($sql){
                echo "ok";
            }else{
                echo "no3";
            }
        }
    }
    
    