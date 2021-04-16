// Constructor
Vec3 = function( x, y, z )
{

  this.x = x;
  this.y = y;
  this.z = z;

}

// Add method
Vec3.prototype.add = function( v )
{

  this.x += v.x;
  this.y += v.y;
  this.z += v.z;
  return this;

}
// Hikizan(subtraction) method
Vec3.prototype.sub = function( v )
{

  this.x -= v.x;
  this.y -= v.y;
  this.z -= v.z;
  return this;

}
// Kakezan(multiplication) method
Vec3.prototype.mul = function( v1, v2 )
{

  this.x = v1.x * v2.x;
  this.y = v1.y * v2.y;
  this.z = v1.z * v2.z;
  return this;

}
// nijo(Square) method
Vec3.prototype.squ = function( v )
{
  this.x = v.x * v.x;
  this.y = v.y * v.y;
  this.z = v.z * v.z
  return this;

}
// Sum method
Vec3.prototype.sum = function()
{

  return this.x + this.y + this.z;

}

// min method
Vec3.prototype.min = function()
{

  var min;

  min = this.x;

  if(min > this.y)
  {min = this.y;}

  if(min > this.z)
  {min = this.z;}

  return min;

}

// max method
Vec3.prototype.max = function()
{
  var max;

  max = this.x;

  if(max < this.y)
  {max = this.y;}

  if(max < this.z)
  {max = this.z;}

  return max;

}

// mid method
Vec3.prototype.mid = function()
{  var mid;
  if(this.x != this.min && this.x != this.max)
  {mid = this.x;}

  if(this.y != this.min && this.y != this.max)
  {mid = this.y;}

  if(this.z != this.min && this.z != this.max)
  {mid = this.z;}

  return mid;

}
