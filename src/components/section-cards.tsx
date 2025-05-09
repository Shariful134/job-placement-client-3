/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllUserQuery } from "@/redux/user/userApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllOrderQuery } from "@/redux/order/orderApi";

export function SectionCards() {
  const { data: userData, isFetching } = useGetAllUserQuery(undefined);
  const { data: allOrderData } = useGetAllOrderQuery(undefined);

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
        <Skeleton />
      </div>
    );
  }

  const subtotals = allOrderData?.data?.reduce(
    (sum: number, order: any) => sum + Number(order.totalPrice),
    0
  );

  const subtotal = Number(subtotals?.toFixed(2));

  const newCustomerCount = userData?.data?.length || 0;
  const prevNewCustomerCount = 100;

  const activeAccountCount = userData?.data?.length || 0;
  const prevActiveAccountCount = 200;

  const calculatePercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const revenueGrowth = 12.5;
  const customerGrowth = calculatePercentage(
    newCustomerCount,
    prevNewCustomerCount
  );
  const activeAccountGrowth = calculatePercentage(
    activeAccountCount,
    prevActiveAccountCount
  );
  const growthRate = 4.5;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs dark:bg-card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            ${subtotal}
          </CardTitle>
          <Badge variant="outline" className="text-green-500">
            <IconTrendingUp />
            {revenueGrowth > 0 ? `+${revenueGrowth}%` : `${revenueGrowth}%`}
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs dark:bg-card">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            {newCustomerCount}
          </CardTitle>
          <Badge
            variant="outline"
            className={customerGrowth >= 0 ? "text-green-500" : "text-red-500"}
          >
            {customerGrowth >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
            {customerGrowth >= 0
              ? `+${customerGrowth.toFixed(1)}%`
              : `${customerGrowth.toFixed(1)}%`}
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {customerGrowth >= 0 ? "Up" : "Down"}{" "}
            {Math.abs(customerGrowth).toFixed(1)}% this period
            {customerGrowth >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>

      {/* Active Accounts Card */}
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs dark:bg-card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            {activeAccountCount}
          </CardTitle>
          <Badge
            variant="outline"
            className={
              activeAccountGrowth >= 0 ? "text-green-500" : "text-red-500"
            }
          >
            {activeAccountGrowth >= 0 ? (
              <IconTrendingUp />
            ) : (
              <IconTrendingDown />
            )}
            {activeAccountGrowth >= 0
              ? `+${activeAccountGrowth.toFixed(1)}%`
              : `${activeAccountGrowth.toFixed(1)}%`}
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {activeAccountGrowth >= 0 ? "Strong" : "Weak"} user retention
            {activeAccountGrowth >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Engagement exceeds targets
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs dark:bg-card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            {growthRate}%
          </CardTitle>
          <Badge variant="outline" className="text-green-500">
            <IconTrendingUp />+{growthRate}%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
