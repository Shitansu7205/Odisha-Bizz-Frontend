import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, User, Save } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Shitansu Kumar",
    email: "shitansu@example.com",
    phone: "+91 9876543210",
    role: "Admin",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // save API call here
    console.log("Profile Saved:", profile);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50 p-6">
      <Card className="max-w-2xl mx-auto shadow-lg rounded-2xl border border-green-100">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-3 border-4 border-green-500 shadow-md">
            <AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=SK" />
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold text-green-700">My Profile</CardTitle>
          <p className="text-gray-500 text-sm">{profile.role}</p>
        </CardHeader>

        <CardContent className="space-y-5 mt-4">
          <div>
            <Label className="text-blue-600 flex items-center gap-2 mb-1">
              <User className="w-4 h-4" /> Name
            </Label>
            <Input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="focus-visible:ring-green-600"
            />
          </div>

          <div>
            <Label className="text-blue-600 flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4" /> Email
            </Label>
            <Input
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="focus-visible:ring-green-600"
            />
          </div>

          <div>
            <Label className="text-blue-600 flex items-center gap-2 mb-1">
              <Phone className="w-4 h-4" /> Phone
            </Label>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="focus-visible:ring-green-600"
            />
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 rounded-xl flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
