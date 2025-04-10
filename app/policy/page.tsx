"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TermsOfUse from "./components/terms-of-use"
import PrivacyPolicy from "./components/privacy-policy"
import ReturnPolicy from "./components/return-policy"
import PolicyForSales from "./components/policy-for-sales"

const policies = [
  { name: "1. Điều khoản sử dụng", component: <TermsOfUse /> },
  { name: "2. Chính sách bảo mật", component: <PrivacyPolicy /> },
  { name: "3. Chính sách đổi trả", component: <ReturnPolicy /> },
  { name: "4. Chính sách cho website bán hàng", component: <PolicyForSales /> },
]

const PolicyHub = () => {
  
  const [selectedPolicy, setSelectedPolicy] = useState(policies[0])

  const SidebarPolicy = () => (
    <div className="space-y-4 py-2">
      <div className="px-3 py-2">
        <div className="space-y-1">
          {policies.map((policy) => (
            <Button
              key={policy.name}
              variant={policy === selectedPolicy ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedPolicy(policy)}
            >
              {policy.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen max-w-screen-2xl mx-2 md:px-16">
      <aside className="hidden w-80 shrink-0 border-r lg:block">
        <ScrollArea className="h-full py-6">
          <SidebarPolicy />
        </ScrollArea>
      </aside>

      <main className="flex-1">
        <div className="mt-4 mx-2 md:hidden">
          <Select onValueChange={(value) => setSelectedPolicy(policies.find((p) => p.name === value) || policies[0])}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={selectedPolicy.name} />
            </SelectTrigger>
            <SelectContent>
              {policies.map((policy) => (
                <SelectItem key={policy.name} value={policy.name}>
                  {policy.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedPolicy.component}
      </main>
    </div>
  )
}

export default PolicyHub;