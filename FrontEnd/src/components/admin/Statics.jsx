import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const Statics = () => {
  const pieRef = useRef();
  const barRef = useRef();
  const [users, setUsers] = useState([]); 
  const [selectedUserId, setSelectedUserId] = useState(null); 

  useEffect(() => {
    const fetchSalesSummary = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sales/sales-summary');
        setUsers(response.data);
        drawPieChart(response.data)
      } catch (error) {
        console.error("Error fetching sales summary:", error);
      }
    };

    fetchSalesSummary();
  }, []);
  const drawPieChart = (userData) => {
    const svg = d3.select(pieRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const radius = Math.min(width, height) / 2;
  
    svg.selectAll("*").remove();
  
    const pie = d3.pie().value(d => d.totalIncome);
    const path = d3.arc().outerRadius(radius - 10).innerRadius(0);
  
    const arc = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .selectAll('.arc')
      .data(pie(userData))
      .enter().append('g')
      .attr('class', 'arc');
  
    arc.append('path')
      .attr('d', path)
      .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
      .on('click', (event, d) => {
        const userId = d.data._id;
        setSelectedUserId(userId);
      });
  
    arc.append('text')
      .attr('transform', d => `translate(${path.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => d.data.name);
  };
  
  useEffect(() => {
    const fetchTransactionsForUser = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8080/sales/transactions?user=${userId}`);
        drawBarChart(response.data);
      } catch (error) {
        console.error("Failed to fetch transactions for user:", error);
      }
    };
    
    if (selectedUserId) {
      fetchTransactionsForUser(selectedUserId);
    }
  }, [selectedUserId]);




  const drawBarChart = (data) => {
    const svg = d3.select(barRef.current);
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
  
    svg.selectAll("*").remove();
  
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);
  
    x.domain(data.map(d => d.id)); 
    y.domain([0, d3.max(data, d => d.total_price)]); 
  
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, "s")) 
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Total Price');
  
    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.id)) 
        .attr('y', d => y(d.total_price)) 
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.total_price)) 
        .attr('fill', 'steelblue');
  };
  
  

  return (
    <div style={{ backgroundColor: 'white', width: '100%', minHeight: '100vh' }}>
      <svg ref={pieRef} width={500} height={500}></svg>
      <svg ref={barRef} width={500} height={300}></svg>
    </div>
  );
};

export default Statics;