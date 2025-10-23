import { AlertTriangle, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // shadcn/ui
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
            <Card className="shadow-lg rounded-lg w-full max-w-sm">
                <CardContent className="flex flex-col items-center text-center p-8">
                    <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Not Authorised</h1>
                    <p className="text-gray-600 mb-6">
                        You are not authorised to access this page.
                    </p>
                    <Link to="/login" className="w-full">
                        <Button variant="default" className="w-full">
                            <LogIn className="w-5 h-5" />
                            Go to Login
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default Unauthorized;
