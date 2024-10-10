"use client"

import { useState ,useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Github, GraduationCap, Linkedin, Mail, MapPin, Phone, User, Briefcase, Building, MessageCircle } from "lucide-react"
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { createUserInvitationUrl, getUserInfoUrl } from '@/urls/urls';

import { useRouter } from 'next/navigation'
import Navbar2 from "../header/Navbar2"

export default function ProfileDisplay({ user }) {
  const [activeTab, setActiveTab] = useState("about")
  

  const router = useRouter(); 
  const [isConnected, setIsConnected] = useState(user.isFollowing);

  const location = usePathname(); 
  const userId = location.substring(9);
  const [usr, setUsr] = useState({});
  const [err, setErr] = useState("");
  const [iscurrent, setcurrent] = useState(undefined);
   
    // Logic to handle follow request
    const handleConnect = async () => {
      let user;
      if(typeof window !== undefined)
        user = JSON.parse(localStorage.getItem("user-threads"))
      // if(userId === user._id){
      //   setcurrent(true);
      // }
      setIsConnected(!isConnected);
        await axios.post(createUserInvitationUrl , {
          toUserId:usr._id,
          fromUserId:user._id,
        })
        .then((res) => {
          console.log(res.data);

        })
        .catch((err) => {
          console.log(err);
        })
    };

    async function getUser(){
      try {
        await axios.post(getUserInfoUrl,{userId:userId})
        .then((res) => {
          // console.log(res.data);
          setUsr(res.data.user);
        })
        .catch((err) => {
          console.log(err);
          setErr(err.response.data.msg);
        })
      } catch (error) {
        console.log(error)
      }
    }

  const handleMessage = () => {
    // Logic to open a messaging interface
  };

  const handleDonate = () => {
    // Logic to handle donation (e.g., open a payment gateway)
  };
  useEffect(() => {
      let user;
      if(typeof window !== undefined)
        user = JSON.parse(localStorage.getItem("user-threads"))
      if(userId === user._id){
        setcurrent(true);
      }
    console.log(userId)
    getUser();
  },[])
  const profile = {
    fullName: "Quark",
    email: "Quark@gmail.com",
    graduationYear: "2017",
    degree: "B.Tech in Electronics and Communication Engineering",
    currentPosition: "Developer Engineer",
    company: "NIT goa.",
    location: "Goa, India",
    phone: "+91 1234567890",
    linkedin: "https://www.linkedin.com/groups/9803534/",
    github: "https://github.com/UNPHASYDAISY",
    bio: "Passionate about leveraging technology to solve real-world problems. Experienced in machine learning and cloud computing.",
    skills: ["Machine Learning", "Cloud Computing", "Data Science", "Blockchain"],
    projects: [
      {
        title: "AI-Powered Chatbot",
        description: "Developed a conversational AI chatbot for customer support",
      },
      {
        title: "Blockchain-based Supply Chain",
        description: "Implemented a transparent supply chain management system using blockchain",
      },
    ],
    education: [
      {
        degree: "Electronics and Communication Eng.",
        institution: "NIT Goa",
        year: "2026",
      },
    ],
    experience: [
      {
        position: "Student",
        company: "NIT Goa",
        duration: "Present",
      },
      {
        position: " ",
        company: "",
        duration: " ",
      },
    ],
  }

 

  return (
    <div>
    <Navbar2/>
    <div className="container mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden">
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 pt-20 pb-16 px-4 sm:pt-24 sm:pb-32 sm:px-6 lg:px-8">
          <div className="absolute -bottom-12 left-0 w-full flex justify-center sm:justify-start sm:left-6 lg:left-8">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white">
              <AvatarImage src="https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg?w=740" alt={profile.fullName} />
              <AvatarFallback>{profile.fullName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-white text-center sm:text-left sm:pl-36 lg:pl-40">
            <h1 className="text-2xl sm:text-3xl font-bold">{usr?.name}</h1>
            <p className="text-sm sm:text-base mt-1">{profile.currentPosition} at {profile.company}</p>
          </div>
        </div>
        <CardContent className="pt-16 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-6">
            <Button onClick={() => router.push('/update-profile')} variant="outline" size="sm" className="mr-2 text-xs sm:text-sm">
              Edit Profile
            </Button>
           { iscurrent === true ? (<Button onClick={() => router.push('/donation')} variant="outline" size="sm" className="mr-2 text-xs sm:text-sm">
              Donate
            </Button>):(<Button size="sm" onClick={handleConnect} className="text-xs sm:text-sm">
              {isConnected ? (
                <Link href='/chat'>
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Message
                </Link>
              ) : (
                'Connect'
              )}
            </Button>)}
            
          </div>
          <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full flex flex-wrap justify-start mb-6 bg-transparent">
              {["about", "experience", "education", "projects"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-grow sm:flex-grow-0 text-xs sm:text-sm py-2 px-2 sm:px-4 m-0.5 sm:m-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="about" className="mt-4 sm:mt-6">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">About</h3>
                  <p className="text-xs sm:text-sm">{profile.bio}</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Contact Information</h3>
                  <div className="grid gap-2 text-xs sm:text-sm">
                    {[
                      { icon: Mail, text: profile.email },
                      { icon: Phone, text: profile.phone },
                      { icon: MapPin, text: profile.location },
                      { icon: Linkedin, text: "LinkedIn Profile", link: profile.linkedin },
                      { icon: Github, text: "GitHub Profile", link: profile.github },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <item.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-muted-foreground" />
                        {item.link ? (
                          <Link href={item.link} className="text-blue-600 hover:underline">
                            {item.text}
                          </Link>
                        ) : (
                          <span>{item.text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="experience" className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Work Experience</h3>
              <div className="space-y-3 sm:space-y-4">
                {profile.experience.map((exp, index) => (
                  <Card key={index}>
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="text-sm sm:text-base">{exp.position}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">{exp.company} • {exp.duration}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="education" className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Education</h3>
              <div className="space-y-3 sm:space-y-4">
                {profile.education.map((edu, index) => (
                  <Card key={index}>
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="text-sm sm:text-base">{edu.degree}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">{edu.institution} • {edu.year}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="projects" className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Projects</h3>
              <div className="grid gap-3 sm:gap-4">
                {profile.projects.map((project, index) => (
                  <Card key={index}>
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="text-sm sm:text-base">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <p className="text-xs sm:text-sm">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}


