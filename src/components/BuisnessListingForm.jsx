import { motion } from "framer-motion";
import { Building2, Mail, Phone, Globe, User, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; // optional helper if you use it

export default function BusinessListingSection() {
  return (
    <section className="bg-linear-to-br from-gray-50 via-white to-gray-100 py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Illustration */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/images/buisness.png"
            alt="List your business"
            className="w-[85%] max-w-md drop-shadow-2xl"
          />
        </motion.div>

        {/* Right Form */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            List Your Business Today
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of local businesses getting discovered daily. Fill in your details below to get started.
          </p>

          <Card className="shadow-lg rounded-2xl border border-gray-100">
            <CardContent className="p-8 space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label>Name *</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Enter your name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>Phone No *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Enter your phone number"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label>Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>Business Category *</Label>
                  <Select>
                    <SelectTrigger className="pl-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="grocery">Grocery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Business Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label>Business Name *</Label>
                  <div className="relative mt-1">
                    <Building2 className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Enter your business name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>Business Website</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Enter your website URL"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label>Address</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                    <Input placeholder="Enter your address" className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label>City</Label>
                  <Input placeholder="Enter city" />
                </div>
              </div>

              {/* State & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label>State</Label>
                  <Input placeholder="Enter state" />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input placeholder="Enter country" />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-6 rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                Submit Listing
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
