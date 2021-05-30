import React,{Component} from 'react'
import {Button,Image,Platform,View} from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

export default class Camera extends React.Component{
    constructor(){
        super();
        this.state={
            camera:null
        }
    }

    getPermissionAsync=async()=>{
        if(Platform.OS!=='web'){
            const status=await Permissions.askAsync(Permissions.CAMERA_ROLL)
        
        if(status!=='granted'){
            alert("Sorry, we need camera permission")
        }
    }
    }

    pickImage=async()=>{
        try{
            let result=await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,

            })
            if(!result.cancelled){
                this.setState({
                    camera:result.data
                })
                this.uploadImage(result.uri)
            }
        }
        catch(e){
            console.log(e);
        }
    }

    uploadImage=async(uri)=>{
        const data=new FormData()
        let fileName=uri.split('/')[uri.split('/').length-1]
        let type=`image/${uri.split('.')[uri.split('.').length-1]}`
        const fileToUpload={
            uri:uri,
            name:fileName,
            type:type
        }
        data.append('digit',fileToUpload)
        fetch('http://7f3116ecabf2.ngrok.io',{
            method:'POST',
            body:data,
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        .then((response)=>{
            response.json
        })
        .then((result)=>{
            console.log('success')
            console.log(result)
        })

    }

    componentDidMount(){
        this.getPermission();
    }

    render(){
        let image=this.state.camera;
        return(
            <View>
                <Button title='Pick the image from gallery'
                onPress={()=>{this.pickImage}}>

                </Button>
            </View>
        )
    }
}

    