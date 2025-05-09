/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetAllUserQuery } from "@/redux/user/userApi";
import { useGetAllOrderQuery } from "@/redux/order/orderApi";
import { Skeleton } from "./ui/skeleton";

interface ChartData {
  date: string;
  desktop: number;
  orders: number;
}

const chartConfig: ChartConfig = {
  visitors: { label: "Visitors" },
  desktop: {
    label: "New Users",
    color: "var(--primary)",
  },
  orders: {
    label: "Orders",
    color: "var(--secondary)", // Adjust the color for orders
  },
};

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  const { data: usersData } = useGetAllUserQuery(undefined);
  const { data: ordeData } = useGetAllOrderQuery(undefined);
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const users = usersData?.data;
  const orders = ordeData?.data;

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (users && users.length > 0) {
      const userCounts: Record<string, number> = {};

      users.forEach((user: any) => {
        if (!user.createdAt) return;
        const created = new Date(user.createdAt);
        if (isNaN(created.getTime())) return;

        const dateStr = created.toISOString().slice(0, 10); // yyyy-mm-dd
        userCounts[dateStr] = (userCounts[dateStr] || 0) + 1;
      });

      // Process order data
      const orderCounts: Record<string, number> = {};

      orders?.forEach((order: any) => {
        if (!order.createdAt) return;
        const created = new Date(order.createdAt);
        if (isNaN(created.getTime())) return;

        const dateStr = created.toISOString().slice(0, 10); // yyyy-mm-dd
        orderCounts[dateStr] = (orderCounts[dateStr] || 0) + 1;
      });

      // Combine user and order counts
      const result = Object.entries(userCounts).map(([date, userCount]) => ({
        date,
        desktop: userCount,
        orders: orderCounts[date] || 0, // Default to 0 if no orders on this date
      }));

      result.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setChartData(result);
    }
  }, [users, orders]);

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date();
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(referenceDate.getDate() - days);

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate;
    });
  }, [chartData, timeRange]);

  if (!users || !orders) {
    return (
      <div>
        <Skeleton />
        <p>Loading user and order data...</p>
      </div>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>New Users & Orders</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            New user registrations and orders over the selected time period
          </span>
          <span className="@[540px]/card:hidden">Recent activity</span>
        </CardDescription>

        <ToggleGroup
          type="single"
          value={timeRange}
          onValueChange={setTimeRange}
          variant="outline"
          className="hidden @[767px]/card:flex"
        >
          <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
          <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
          <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
        </ToggleGroup>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40 @[767px]/card:hidden">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-secondary)"
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-secondary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey="orders"
              type="natural"
              fill="url(#fillOrders)"
              stroke="var(--color-secondary)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
