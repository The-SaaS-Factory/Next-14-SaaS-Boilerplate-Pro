import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";

export default function ServicesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Services and Contracting</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contracted Services List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contracted Services</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Project</th>
                  <th className="border p-2 text-left">Progress</th>
                  <th className="border p-2 text-left">Start Date</th>
                  <th className="border p-2 text-left">Project Days</th>
                  <th className="border p-2 text-left">Billing</th>
                  <th className="border p-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Project A</td>
                  <td className="border p-2">75%</td>
                  <td className="border p-2">2023-05-01</td>
                  <td className="border p-2">45</td>
                  <td className="border p-2">$7,500 / $10,000</td>
                  <td className="border p-2">
                    <Link
                      href="/details/project-a"
                      className="text-blue-500 hover:underline"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Project B</td>
                  <td className="border p-2">30%</td>
                  <td className="border p-2">2023-06-15</td>
                  <td className="border p-2">20</td>
                  <td className="border p-2">$3,000 / $8,000</td>
                  <td className="border p-2">
                    <Link
                      href="/details/project-b"
                      className="text-blue-500 hover:underline"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Project C</td>
                  <td className="border p-2">90%</td>
                  <td className="border p-2">2023-04-01</td>
                  <td className="border p-2">60</td>
                  <td className="border p-2">$12,000 / $15,000</td>
                  <td className="border p-2">
                    <Link
                      href="/details/project-c"
                      className="text-blue-500 hover:underline"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* New Service Contract Form */}
        <div>
          <Card className="mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <CardHeader>
              <CardTitle className="text-white">
                Why Choose Our Service?
              </CardTitle>
              <CardDescription className="text-white">
                We offer top-notch development services with a focus on quality
                and timely delivery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Our team of experts ensures that your project is completed to
                the highest standards, using cutting-edge technologies and best
                practices in the industry.
              </p>
              <Link
                href="/why-choose-us"
                className="text-white underline hover:text-gray-200"
              >
                Learn more about our services
              </Link>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mb-4">Contract New Service</h2>
          <form className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="Enter project name" />
            </div>
            <div>
              <Label htmlFor="budget">Estimated Budget</Label>
              <Select>
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Less than $5,000</SelectItem>
                  <SelectItem value="medium">$5,000 - $10,000</SelectItem>
                  <SelectItem value="high">More than $10,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Project Overview</Label>
              <Textarea
                id="description"
                placeholder="Briefly describe your project"
              />
            </div>
            <div>
              <Label htmlFor="urgency">Project Urgency</Label>
              <Select>
                <SelectTrigger id="urgency">
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="stack">Desired Tech Stack</Label>
              <Input id="stack" placeholder="E.g., React, Node.js, MongoDB" />
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
