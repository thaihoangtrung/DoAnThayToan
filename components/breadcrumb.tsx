import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface BreadcrumbCustomProps {
  nameFirst?: string;
  nameSecond?: string;
  linkSecond?: string;
  nameThird?: string;
  linkThird?: string;
  nameFourth?: string;
}

export default function BreadcrumbCustom({
  nameSecond,
  linkSecond,
  nameThird,
  linkThird,
  nameFourth,
}: BreadcrumbCustomProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {nameSecond && linkSecond && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href={linkSecond}>{nameSecond}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {nameThird && linkThird && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href={linkThird}>{nameThird}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {nameFourth && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{nameFourth}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
