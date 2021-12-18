using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nums_to_Stars
{
    class Program
    {
        static void Main(string[] args)
        {
              Console.WriteLine("Type in the amount of numbers you wish for: ");
              string j;
              int numberOfElem;
              j = Console.ReadLine();
              numberOfElem= Convert.ToInt32(j);

              var numbers = new int[numberOfElem];
              string[] numList = new string[numberOfElem];

              Console.WriteLine("Type in the numbers you want to see in stars: ");
                  numList = Console.ReadLine().Split();
              for (int i = 0; i < numberOfElem; i++)
              {
                  numbers[i] = Convert.ToInt32(numList[i]);
              }
            //foreach(int number in nums)
            // Console.Write("{0} ",number);
             int p=0;
              do
              { 
                  for(int m=0;m<numberOfElem;m++)
                  {
                      if(numbers[m]>p)
                          Console.Write("* ");
                      else Console.Write("  ");

                  }
                  p++;
                  Console.WriteLine();
              }
              while (p<AMV(numbers,numberOfElem));
            // Console.WriteLine(AMV(nums,value));
            //-------------------Code for Graph design-------------------//
            Console.WriteLine();
            p = 0;
            int q = AMV(numbers, numberOfElem);

            do
            {


                for (int n = 0; n < numberOfElem; n++)
                {
                    if ( q > numbers[n])
                        Console.Write("  ");
                    else Console.Write("* ");
            }
                p++;
                q--;
                Console.WriteLine();
            }
            while (p < AMV(numbers, numberOfElem));

       }
      static int AMV(int[] nums,int value)
        {
            int maxval=nums[0];
            int val = value;
            for(int i=0;i<value;i++)
            {
                if (maxval <= nums[i])
                    maxval = nums[i];
            }

            return maxval;  
            
        }
    
    }
}
