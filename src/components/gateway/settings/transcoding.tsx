import React, { useState } from 'react';
import { FiEdit3 } from "react-icons/fi";
import { FaToggleOff,FaToggleOn } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { _updateTranscodingProfile } from '@/lib/api/gateway.api';
import { ClipLoader } from 'react-spinners';
import Modal from '@/components/modal';
import Select from 'react-select';


export default function TranscodingProfile() {
  const [loader,setLoader]=useState(false)
  const [trigger,setTrigger]=useState(false)
  const [transcodingProfiles, setTranscodingProfiles] = useState([
    {
      title: '480p (SD Quality)',
      desc: 'Suitable for slower connections and mobile devices',
      template: {
        "name": "480p0",
        "fps": 0,
        "bitrate": 1600000,
        "width": 854,
        "height": 480,
        "profile": "h264constrainedhigh",
        "gop": "1"
      },
    },
    {
      title: '720p (HD Quality)',
      desc: 'Ideal for high-quality streaming on most devices.',
      template: {
        "name": "720p0",
        "fps": 0,
        "bitrate": 3000000,
        "width": 1280,
        "height": 720,
        "profile": "h264constrainedhigh",
        "gop": "1"
      },
    },
    {
      title: '1080p (Full HD)',
      desc: 'Best for high-resolution content on large screens.',
      template: {
        "name": "1080p0",
        "fps": 0,
        "bitrate": 6500000,
        "width": 1920,
        "height": 1080,
        "profile": "h264constrainedhigh",
        "gop": "1"
      },
    },
  ]);

  const updateTemplate = (index: number, updatedTemplate: any) => {
    const updatedProfiles = [...transcodingProfiles];
    updatedProfiles[index].template = updatedTemplate;
    setTranscodingProfiles(updatedProfiles);
  };



  const updateProfile=async()=>{
      setLoader(true)
     try{
      const response= await _updateTranscodingProfile(transcodingProfiles)
      response?.data&&setLoader(false)
      }catch(e){
        setLoader(false)

      }
  }

  return (
    <>
    <div className='w-full flex flex-col space-y-5'>
      <h5 className='font-bold text-lg'>Your Transcoding Profiles</h5>
      <div className='flex items-center justify-end space-x-4 py-6'>
        <button className='bg-[#58815794] py-2 px-4 text-sm font-bold' onClick={updateProfile}>
           {
            loader?
            <ClipLoader size={12} />
            :
            "Save changes"
           }
     
        </button>
      </div>
      <h5 className='text-sm bg-gray-200 py-4 px-4 rounded-sm w-full'>
        Choose a transcoding profile that suits your content's needs. Adjust resolution, bitrate, and other settings for optimized video quality.
      </h5>
      <div className='flex flex-col py-8'>
        {transcodingProfiles?.map((item, index) => (
          <Profile
            key={index}
            item={item}
            index={index}
            updateTemplate={updateTemplate}
          />
        ))}
        <div className='flex items-center justify-end space-x-4 py-6'>
          <button className='border-[#58815794] border text-[#58815794] py-2 px-4 text-sm font-bold' onClick={()=>setTrigger(true)}>Add new profile</button>
          <button className='bg-[#58815794] py-2 px-4 text-sm font-bold'>Import JSON</button>
        </div>
      </div>
    </div>
     <Modal cname='w-full h-full flex justify-center items-center ' trigger={trigger}>
          <InitProfile setTrigger={setTrigger}/>
    </Modal>
    </>
  );
}

const Profile = ({ item, index, updateTemplate }: { item: any, index: number, updateTemplate: (index: number, template: any) => void }) => {
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState(item);
   const [toggle,setToggle]=useState(false)
  const handleTemplateChange = (updatedTemplate: any) => {
    setProfile({ ...profile, template: updatedTemplate });
    updateTemplate(index, updatedTemplate);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex w-full border-b border-t justify-between px-4 py-4 items-center'>
        <div className='w-3/4'>
          <h5 className='font-bold'>{item?.title}</h5>
          <h5 className='text-sm'>{item?.desc}</h5>
        </div>
        <div className='flex items-center space-x-6'>
          {edit ?
            <IoMdClose className='text-2xl hover:text-red-500' onClick={() => setEdit(false)} />
            :
            <FiEdit3 className='text-2xl hover:text-green-700' onClick={() => setEdit(true)} />
          }
          {toggle?
            <FaToggleOn className='text-2xl text-[#58815794]' onClick={()=>setToggle(false)} />
            :
            <FaToggleOff className='text-2xl' onClick={()=>setToggle(true)} />
          }

        
        </div>
      </div>
      {edit &&
        <Form
          template={profile.template}
          onTemplateChange={handleTemplateChange}
        />
      }
    </div>
  );
};

const Form = ({ template, onTemplateChange }: { template: any, onTemplateChange: (template: any) => void }) => {
  const handleChange = (field: string, value: any) => {
    const updatedTemplate = { ...template, [field]: value };
    onTemplateChange(updatedTemplate);
  };

  return (
    <div className='grid grid-cols-2 gap-6 w-full px-4 py-4'>
      <div className='flex flex-col space-y-1'>
         <h5>FPS</h5>
          <input
            placeholder='FPS'
            value={template?.fps}
            onChange={(e) => handleChange('fps', parseInt(e.target.value))}
            className="border text-black px-4 py-2 rounded-sm"
            type='number'
          />

      </div>
      <div className='flex flex-col space-y-1'>
         <h5>Bitrate</h5>
        <input
          placeholder='Bitrate'
          value={template?.bitrate}
          onChange={(e) => handleChange('bitrate', parseInt(e.target.value))}
          className="border text-black px-4 py-2 rounded-sm"
          type='number'
        />
      </div>
      <div className='flex flex-col space-y-1'>
         <h5>Width</h5>
        <input
          placeholder='Width'
          value={template?.width}
          onChange={(e) => handleChange('width', parseInt(e.target.value))}
          className="border text-black px-4 py-2 rounded-sm"
          type='number'
        />
      </div>
      <div className='flex flex-col space-y-1'>
         <h5>Height</h5>
        <input
          placeholder='Height'
          value={template?.height}
          onChange={(e) => handleChange('height', parseInt(e.target.value))}
          className="border text-black px-4 py-2 rounded-sm"
          type='number'
        />
     </div>
     <div className='flex flex-col space-y-1'>
         <h5>Profile</h5>
        <input
          placeholder='Profile'
          value={template?.profile}
          onChange={(e) => handleChange('profile', e.target.value)}
          className="border text-black px-4 py-2 rounded-sm"
          type='text'
        />
      </div>
      <div className='flex flex-col space-y-1'>
         <h5>GOP</h5>
          <input
            placeholder='GOP'
            value={template?.gop}
            onChange={(e) => handleChange('gop', e.target.value)}
            className="border text-black px-4 py-2 rounded-sm"
            type='text'
          />
      </div>
    </div>
  );
};




const InitProfile=({setTrigger}:any)=>{
   return(
      <div className='w-[45%] py-4 bg-white flex flex-col '>
            <div className='flex justify-end px-6'>
                  <IoMdClose className='text-2xl' onClick={()=>setTrigger(false)}/>
            </div>

            <div className='flex flex-col px-6'>
                <div className='flex flex-col space-y-4'>
                    <h5>Video Quality</h5>
                    <Select                           
                        placeholder="Select a Quality"
                        options={[]}
                        value={""}
                        menuPlacement="auto"
                        menuPosition="fixed"
                    />
        
                </div>  
                <div className='flex items-center py-2'>
                     <button className='bg-[#58815794] border  py-2 px-4 text-sm font-bold' onClick={()=>setTrigger(true)}>Add Profile</button>
                </div>
            </div>


      </div>
   )
}