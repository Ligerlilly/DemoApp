import * as React from "react";
import { Svg, G, Rect, Line, Text } from "react-native-svg";
import * as d3 from "d3";
import { BalanceHistory } from "../../../utils/balance_utils";
import moment from "moment";

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 5;
const colors = {
    axis: "#000",
    bars: "#15AD13",
};

export interface DataPoint {
    label: string;
    value: number;
}

interface BarChartProps {
    balances: BalanceHistory[];
}

export const BarChart = ({ balances }: BarChartProps) => {
    const data: DataPoint[] = balances.map((b: BalanceHistory) => ({
        value: b.balance,
        label: moment(b.timestamp).format("MM/DD/YYYY"),
    }));
    const SVGHeight = 150;
    const SVGWidth = 300;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

    // X scale point
    const xDomain = data.map((item: DataPoint) => item.label);
    const xRange = [0, graphWidth];
    const x = d3.scalePoint().domain(xDomain).range(xRange).padding(0.5);

    // Y scale linear
    const maxValue = d3.max(data, (d) => d.value) || 0;
    const yDomain = [0, d3.max(data, (d: any) => d.value)];
    const yRange = [0, graphHeight];
    const y = d3.scaleLinear().domain(yDomain).range(yRange);

    const middleValue = maxValue / 2;

    return (
        <Svg width={SVGWidth} height={SVGHeight}>
            <G y={graphHeight + GRAPH_MARGIN}>
                {/* Top value label */}
                <Text
                    x={SVGWidth}
                    textAnchor="end"
                    y={y(maxValue) * -1 - 10}
                    fontSize={12}
                    fill="black"
                    fillOpacity={0.4}
                >
                    {maxValue + " " + "jobcoins"}
                </Text>

                {/* top axis */}
                <Line
                    x1="0"
                    y1={y(maxValue) * -1}
                    x2={SVGWidth}
                    y2={y(maxValue) * -1}
                    stroke={colors.axis}
                    strokeDasharray={[3, 3]}
                    strokeWidth="0.5"
                />

                {/* middle axis */}
                <Line
                    x1="0"
                    y1={y(middleValue) * -1}
                    x2={SVGWidth}
                    y2={y(middleValue) * -1}
                    stroke={colors.axis}
                    strokeDasharray={[3, 3]}
                    strokeWidth="0.5"
                />

                {/* bottom axis */}
                <Line
                    x1="0"
                    y1="2"
                    x2={SVGWidth}
                    y2="2"
                    stroke={colors.axis}
                    strokeWidth="0.5"
                />

                {/* bars */}
                {data.map((item: DataPoint, i) => {
                    const xVal = x(item.label) || 0;
                    console.log(item.label);
                    console.log(xVal);
                    return (
                        <Rect
                            key={item.label + i}
                            x={xVal - GRAPH_BAR_WIDTH / 2}
                            y={y(item.value) * -1}
                            rx={2.5}
                            width={GRAPH_BAR_WIDTH}
                            height={y(item.value)}
                            fill={colors.bars}
                        />
                    );
                })}

                {/* labels */}
                {data.map((item, i) => {
                    return (
                        <Text
                            key={"label" + item.label + i}
                            fontSize="8"
                            x={x(item.label)}
                            y="10"
                            textAnchor="middle"
                            fill="black"
                        >
                            {item.label}
                        </Text>
                    );
                })}
            </G>
        </Svg>
    );
};

export default BarChart;
