
import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.core.exceptions import RequestAborted       #https://channels.readthedocs.io/en/latest/topics/consumers.html#asyncwebsocketconsumer
from .models import RomUserNameTablebb,RatingsTablebb
from channels.db import database_sync_to_async      
    # NOTE: IT'S uses to save data to database 
class VideoChatConsumerbb(AsyncJsonWebsocketConsumer): 

    async def connect(self):      
        
        #NOTE: his(tauhid) code
        # self.room_group_namebb="Test-Roombb"      # # NOTE: SO COOL
        # await self.channel_layer.group_add(
        #     # 'Test-Room',      # if you want you can give like this or create variable like down below
        #     self.room_group_namebb,
        #     self.channel_name
        #     )

        await self.accept()        # don't forget to give 'await'...."await" means wait  ...

    async def disconnect(self, close_code):         # it's only disconnect....not dixconnect_json on something like that....own explore:
#   async def disconnect(self):
    # Called when the socket closes
        print(self.room_group_namebb)
        print(self.user_namebb) 
        # print(self.)
        await self.channel_layer.group_discard(
            self.room_group_namebb,
            self.channel_name
        )
        await delete_rome_user_nameFuncbb(self.user_namebb,self.room_group_namebb)

        self.close()
        print('disconnedted baby')


    async def receive_json(self,receive_dictpy):
        print('receive_dictpy',receive_dictpy)
        isRun=True
        
        actionpy=receive_dictpy['actionjs']
        # print('self.channel_name',self.channel_name) 
        # print('type(self.channel_name)',type(self.channel_name) )

        if (actionpy =='new-offerjs') or (actionpy == 'new-answerjs'):
            receiver_channel_namepy=receive_dictpy['messagejs']['receiver_channel_namejs']
            print('before',receive_dictpy)
            # print('type(before)',type(receive_dictpy))
            # print(receive_dictpy) 
            print('before')
            for i in receive_dictpy:
                print(i)
            receive_dictpy['messagejs']['receiver_channel_namejs']=self.channel_name
            # to understand the upper line try to understand the below 
            """ 
            # own explore:
            fazle={"name":'fazleRabbi','msg':{'nm':"khalid",'poko':"billa"}}
            print('fazle',fazle)
            print('fazle',fazle['msg']['poko'])
            fazle['msg']['poko']="cccc"
            print('fazle',fazle['msg']['poko'])
             """


            # print('after')
            print('after',receive_dictpy)
            for i in receive_dictpy:
                print(i)
            # print('type(after)',type(receive_dictpy)) 
            # print(receive_dictpy) 

            await self.channel_layer.send(          # NOTE: 'send' not 'group_send'
                receiver_channel_namepy,
                {
                    'type':'sendb.sdpb',
                    # 'messagejs':messagejsy
                    'receive_dictpy':receive_dictpy
                }
            )
            return

        
        elif (receive_dictpy['actionjs'] == 'new-peerjs' ):
            # print(receive_dictpy) 
            # print(receive_dictpy['messagejs']) 
            # print(receive_dictpy['messagejs']['room_namejs'])  
            self.room_group_namebb = receive_dictpy['messagejs']['room_namejs']
            self.user_namebb=  receive_dictpy['messagejs']['user_namejs']
    # (room_namedb=self.room_group_namebb,user_namedb=self.user_namebb)
            iscreated=await iscreatedFuncbb(self.user_namebb,self.room_group_namebb)
            if not iscreated:
                await sava_rome_user_nameFuncbb(self.user_namebb,self.room_group_namebb)
                await self.channel_layer.group_add(
                # 'Test-Room',      # if you want you can give like this or create variable like down below
                    self.room_group_namebb,
                    self.channel_name
                    )
            else:
                await self.send_json({'actionjs':'change_namebb'})  # NOTE: don't forget to give 'await'
                print('isRun=False')
                isRun=False
        elif (receive_dictpy['actionjs'] == 'feedbackyjs' ):
            await sava_feedback_Funcbb(receive_dictpy['ratingjs'],receive_dictpy['feedmsgjs'])
            isRun=False 


        if isRun: 
            # message=receive_dictpy['messagejs']
            receive_dictpy['messagejs']['receiver_channel_namejs']=self.channel_name
            await self.channel_layer.group_send(
                self.room_group_namebb,
                {
                    'type':'sendb.sdpb',
                    # 'messagejs':messagejsy
                    'receive_dictpy':receive_dictpy
                })
        else:
            isRun=True 


    async def sendb_sdpb(self,event):
        print('join_message baby')
        receive_dictpy=event['receive_dictpy']
        # await self.send(text_data=json.dump(message))      # he did like this...fuck

        await self.send_json(receive_dictpy)

from django.db.models import Q
@database_sync_to_async
def iscreatedFuncbb(uname,roomn):
    print('inside iscreatedFuncbb') 
    # isexisty=RomUserNameTablebb.objects.filter(Q(room_namedb=roomn) and Q(user_namedb=uname) ).exists()  #give '&' not 'and' own explore:.....geek>100\prog100\schooly\views.py
    isexisty=RomUserNameTablebb.objects.filter(Q(room_namedb=roomn) & Q(user_namedb=uname) ).exists()  #https://stackoverflow.com/questions/2690521/django-check-for-any-exists-for-a-query 
    # nameb=RomUserNameTablebb.objects.filter(user_namedb=uname).exists()
    return isexisty  


@database_sync_to_async
def sava_rome_user_nameFuncbb(uname,roomn):
    print('inside sava_rome_user_nameFuncbb') 
    return RomUserNameTablebb.objects.create(room_namedb=roomn,user_namedb=uname)

@database_sync_to_async
def delete_rome_user_nameFuncbb(uname,roomn):
    print('delete_rome_user_nameFuncbb')
    isexisty=RomUserNameTablebb.objects.filter(Q(room_namedb=roomn) and Q(user_namedb=uname) ).delete()  #https://stackoverflow.com/questions/2690521/django-check-for-any-exists-for-a-query
    # nameb=RomUserNameTablebb.objects.filter(user_namedb=uname).exists()
    return  
    

@database_sync_to_async
def sava_feedback_Funcbb(rtng,feedbk):
    print('inside sava_feedback_Funcbb',rtng,feedbk) 
    return RatingsTablebb.objects.create(ratingsdb=rtng,fdbkdb=feedbk)
