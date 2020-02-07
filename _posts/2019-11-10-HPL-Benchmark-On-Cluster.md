---
layout: post
title:  "HPL Benchmark Test Implementation on Georgia Tech PACE-ICE Cluster"
date:   2019-11-10
excerpt: "A final project for my HPC class documentation"
project: true
tag:
- HPC
comments: true
---

## [HPLinpack](http://www.netlib.org/benchmark/hpl/): Dense Linear Algebra Test on PACE-ICE Cluster

HPL - A Portable Implementation of the High-Performance Linpack, Benchmark for Distributed-Memory Computers <br>
And the versioning is: <br>
HPL 2.3 - by Antoine Petitet, Clint Whaley, Jack Dongar <br>

> HPL is a High-Performance Linpack benchmark implementation.

> HPL is written in a portable ANSI C and requires an MPI implementation as well as either BLAS or VSIPL library. Such choice of software dependencies gives HPL both portability and performance.

> The HPL package provides a testing and timing program to quantify the accuracy of the obtained solution as well as the time it took to compute it. The best performance achievable by this software on your system depends on a large variety of factors. Nonetheless, with some restrictive assumptions on the interconnection network, the algorithm described here and its attached implementation are scalable in the sense that their parallel efficiency is maintained constant with respect to the per processor memory usage.

In our implementations for this project, <br/>

All the following packages are included in the module mkl/19.0.

- HPL rely on an efficient implementation of the Basic Linear Algebra Subprograms (BLAS) (http://www.netlib.org/blas/blas-3.8.0.tgz)

- And MPI module we already had as mvapich2 2.3, a MPI based software package, alternative versionings can be found at (http://mvapich.cse.ohio-state.edu/downloads/)


### Problems to be solved:
The code solves a uniformely random system of  linear equations and reports time and floating-point execution rate using a standard formula for operation count. Specifically, HPL generates a linear system of equations of order n and solves it using LU decomposition with partial row pivoting.<br>
For N Problem size, it will need (2/3 * N^3－2N^2) steps to compute, and it measure the computational time performing such (2/3 * N^3－2N^2) steps operations. And then calculated the FLOPs. <br>
Since HPL performs computation on an N x N array of Double Precision (DP) elements, and that each double precision element requires sizeof(double) = 8 bytes, the memory consumed for a problem size of N is 8N^2.<br>
NB=192 for the broadwell processors.<br>
P and Q, knowing that the product P x Q SHOULD typically be equal to the number of MPI processes.<br>

> Here are the parameters:
```
T/V    : Wall time / encoded variant.
N      : The order of the coefficient matrix A.
NB     : The partitioning blocking factor.
P      : The number of process rows.
Q      : The number of process columns.
Time   : Time in seconds to solve the linear system.
Gflops : Rate of execution for solving the linear system.
```

### Values of the benchmark: <br>
The HPL benchmark is used as reference benchmark to provide data for the Top500 list and thus rank to supercomputers worldwide.It has the testing program to quantify the accuracy of the obtained solution as well as the time it took to compute it. Generally It reports the computation time per node, and the FLOPS rate. 

### Nodes on pace-ice cluster intended to use:<br>
We chose the nodes on pace-ice clusters with the CPU only.  <br>
They are the ones with 28 CPU cores (14 physical cores), Model is  Intel(R) Xeon(R) CPU E5-2680 v4 @2.40GHz machines. <br>
We intended to perform benchmark tests on one node and four nodes.<br>

#### The balance of being to specific to one application but very predictive, versus being general to lots of applications while being too simple to predict the performance of any application very well:
The HPLinpack (HPL) as a scalable addition to the original Linpack benchmark suites, due to its parallel computation efficiency remaining constant respect to per process memory usage, succeeded in scalability. And it outputs only one single number in time and FLOPS, making this benchmark results are easily compared with different machines.<br>
In this sense, the benchmark is very good at being general to lots of applications. <br>
However, it only tests the **dense linear system**, omitted a fact that there are many more other operations can be taken into account to the performance evaluation. Thus, the best results can be achieved by fine tuning for a particular machine targeting to solving the dense linear system, which caused the results shown are biased. <br>
That is to say, the benchmark is too simple for all kinds of applications testing, but can be very predictive for machines or applications specificially for dense linear system problem solving. <br>

### Source code:
The source code can be obtained from (http://www.netlib.org/benchmark/hpl/hpl-2.3.tar.gz) as a tar, and the dependency packages are BLAS (http://www.netlib.org/blas/blas-3.8.0.tgz) and mpi (https://download.open-mpi.org/release/open-mpi/v4.0/openmpi-4.0.2.tar.gz). However, in practice, we directly loaded the module installed on PACE. I have documented a step by step workflow for how to successfully install and run the benchmark.

### Dependencies and Enviroment
The benchmark needs to be run on a computing node,
the following modules need to be loaded:
```
module use $CSE6230_DIR/modulefiles
module load cse6230/core
module load cse6230/mkl/19.0
```
The benchmark can be made locally once downloaded, and it required MPI packages to successfully run. In our case, we already have the MPI software installed. 

### Workflow
### Step 1 Benchmark installation:
Create a directory named "hpl" under "$CSE6230_DIR"/final, to contain all the neccessary files for the benchmark. 
#### About Downloading the packages:

hpl-2.3.tar.gz can be downloaded at (http://www.netlib.org/benchmark/hpl/hpl-2.3.tar.gz) <br/>
the benchmark tool is hpl-2.3, but blas will be one of the neccessary package to successfully make the executionables 
BLAS. In our project, the linear algebra package is contained with the intel mkl module, we do not neccessarily install it from scratch.

#### About building the tool packages:
##### Load Modules:

It is always needed to load the neccessary modules first, here to ease the touble, we always load :
```bash
module load cse6230/core
module load mkl/19.0
```

##### HPL:

After downloading and uploads the packages to the final/hpl folder:

`mguo34@coc-ice:~/cse6230/final/hpl$ tar -xzvf hpl-2.3.tar.gz` <br>

`mguo34@coc-ice:~/cse6230/final/hpl$ cd hpl-2.3/setup` <br>

To generate a template:<br>

`mguo34@coc-ice:~/cse6230/final/hpl/hpl-2.3/setup$ sh make_generic ` <br>

Then have our make file named as Make.Linux, and move it to the higher level directory <br>

`mguo34@coc-ice:~/cse6230/final/hpl/hpl-2.3/setup$  cp Make.UNKNOWN ../Make.Linux  ` <br>

And go back to hpl/hpl-2.3/ directory <br/>
`mguo34@coc-ice:~/cse6230/final/hpl/hpl-2.3/setup$ cd .. ` <br>

Now we have a Make.Linux template to work on. 

```bash
mguo34@coc-ice:~/cse6230/final/hpl/hpl-2.3$ ls
acinclude.m4  BUGS          config.sub    COPYRIGHT  INSTALL     Makefile.am  Make.top  README   THANKS
aclocal.m4    ChangeLog     configure     depcomp    install-sh  Makefile.in  man       setup    TODO
AUTHORS       compile       configure.ac  HISTORY    lib         Make.Linux   missing   src      TUNING
bin           config.guess  COPYING       include    Makefile    makes        NEWS      testing  www

```
Open with any editors, it should be showing a template, yet not completed, we need add dependecy patch to make sure the tool can be successfully built. it will need mvapich2, BLAS, and the hpl <br>

```bash
mguo34@coc-ice:~/cse6230/final/hpl/hpl-2.3$ vi Make.Linux
```
##### Linear Algebra Package:
The linear algebra package is already contained within the mkl/19.0 module, we will simply load this module, and modify the dependecy in Make.Linux file, like the description below:

##### MODIFY MAKE FILE:
After successfully get all the neccessary files, we modified package paths and complier/linkers choice in Make.Linux config file:
```bash
TOPdir       = $(HOME)/cse6230-hw/final/hpl/hpl-2.3
MPdir        = /usr/local/pacerepov1/intel/compiler/16.0/impi/5.1.1.109
MPinc        = -I $(MPdir)/include64
MPlib        = $(MPdir)/intel64/lib/libmpi_mt.so
Adir        = $(MKLROOT)
ifndef  LAinc
LAinc        = -I $(LAdir)/include/
endif
ifndef  LAlib
LAlib        = -L$(LAdir)/lib/intel64 \
               -Wl,--start-group \
               $(LAdir)/lib/intel64/libmkl_intel_lp64.a \
               $(LAdir)/lib/intel64/libmkl_intel_thread.a \
               $(LAdir)/lib/intel64/libmkl_core.a \
               -Wl,--end-group -lpthread -ldl
endif

CC       = mpiicc
CCNOOPT  = $(HPL_DEFS)
OMP_DEFS = -qopenmp
CCFLAGS  = $(HPL_DEFS) -O3 -w -ansi-alias -i-static -z noexecstack -z relro -z now -nocompchk
LINKER       = $(CC)
LINKFLAGS    = $(CCFLAGS) $(OMP_DEFS) -mt_mpi
```
##### Compile into executable:
Now go to the hpl-2.3 directory and start compiling: <br>
First Make clean:<br>
 `mguo34@coc-ice:~/cse6230/final/hpl/hpl-2.3$ make arch=Linux clean_arch_all`<br>
Then Make:<br>
 `mguo34@coc-ice:~/cse6230/final/hpl/hpl-2.3$ make arch=Linux`<br>

### Step 2 load modules and run a test:
 ```
module load cse6230/core
module load mkl/19.0
```
```bash
CPU=$(cat /proc/cpuinfo | grep "model name" | tail -1)
COUNT=$(cat /proc/cpuinfo | grep processor | wc -l)
MEM=$(cat /proc/meminfo |grep MemTotal | tail -1)
echo "CPU : $CPU"
echo "Total CPU Cores : $COUNT"
echo "$MEM"
```
```
CPU : model name	: Intel(R) Xeon(R) CPU E5-2680 v4 @ 2.40GHz
Total CPU Cores : 28
MemTotal:       132176424 kB
```
According to HPL suggestion, a good N should makes the program use 90% of total memory, which is $$\sqrt{(130844220*1024/8)}*0.9=116,472$$. However, for testrun purpose, it takes too long to compute. So we selected a N=19200 and N=38400, which is about ten and five times smaller than that. For Block size, we also followed the recommendation to choose a value in the [32 , 256] interval. In our example, we selected 64 and 192. Because the example test was performed on one node (chip), each core can be considered closely connected. Hence, 4 by 7 grid was set.   
  
When submitting to compute node with a script (**`"$CSE6230_DIR"/final/script/hpl_singleNode.sh**), we tested from 19200 to 153600 to see how different size (Ns) affect the performance. **Example job submission script can be found in `"$CSE6230_DIR"/final/script/hpl_example.sh`**.
```bash
# testrun (for simplicity, only partial test is shown below)
cd /nv/coc-ice/zjiang333/cse6230-hw/final/hpl/hpl-2.3/bin/Linux/
mpirun -np 28 ./xhpl 
```
```
================================================================================
HPLinpack 2.3  --  High-Performance Linpack benchmark  --   December 2, 2018
Written by A. Petitet and R. Clint Whaley,  Innovative Computing Laboratory, UTK
Modified by Piotr Luszczek, Innovative Computing Laboratory, UTK
Modified by Julien Langou, University of Colorado Denver
================================================================================

An explanation of the input/output parameters follows:
T/V    : Wall time / encoded variant.
N      : The order of the coefficient matrix A.
NB     : The partitioning blocking factor.
P      : The number of process rows.
Q      : The number of process columns.
Time   : Time in seconds to solve the linear system.
Gflops : Rate of execution for solving the linear system.

The following parameter values will be used:

N      :   19200    38400 
NB     :      64      192 
PMAP   : Row-major process mapping
P      :       4 
Q      :       7 
PFACT  :   Right 
NBMIN  :       4 
NDIV   :       2 
RFACT  :   Crout 
BCAST  :  1ringM 
DEPTH  :       0 
SWAP   : Mix (threshold = 64)
L1     : transposed form
U      : transposed form
EQUIL  : yes
ALIGN  : 8 double precision words

--------------------------------------------------------------------------------

- The matrix A is randomly generated for each test.
- The following scaled residual check will be computed:
      ||Ax-b||_oo / ( eps * ( || x ||_oo * || A ||_oo + || b ||_oo ) * N )
- The relative machine precision (eps) is taken to be               2.220446e-16
- Computational tests pass if scaled residuals are less than                16.0

================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4       19200    64     4     7               8.38             5.6287e+02
HPL_pdgesv() start time Wed Dec 11 15:32:05 2019

HPL_pdgesv() end time   Wed Dec 11 15:32:14 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   1.57135916e-03 ...... PASSED
================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4       19200   192     4     7               6.31             7.4785e+02
HPL_pdgesv() start time Wed Dec 11 15:32:14 2019

HPL_pdgesv() end time   Wed Dec 11 15:32:21 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   1.73935730e-03 ...... PASSED
================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4       38400    64     4     7              60.83             6.2057e+02
HPL_pdgesv() start time Wed Dec 11 15:32:22 2019

HPL_pdgesv() end time   Wed Dec 11 15:33:23 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   1.37495714e-03 ...... PASSED
================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4       38400   192     4     7              43.81             8.6164e+02
HPL_pdgesv() start time Wed Dec 11 15:33:25 2019

HPL_pdgesv() end time   Wed Dec 11 15:34:09 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   1.34900801e-03 ...... PASSED
================================================================================

Finished      4 tests with the following results:
              4 tests completed and passed residual checks,
              0 tests completed and failed residual checks,
              0 tests skipped because of illegal input values.
--------------------------------------------------------------------------------

End of Tests.
================================================================================
```
### step 3 gather statistics with a performance metric (example shown here, results plots are not included)
A shell was created here below:
```bash
#!/bin/sh

#PBS -N hpl_fullscale
### request four node with 112 cores
#PBS -l nodes=4:ppn=28,walltime=00:30:00
#PBS -q coc-ice-multi

module load cse6230/core
module load mkl/19.0

cd "$HOME"/cse6230-hw/final/hpl/hpl-2.3/bin/Linux/
### run example with 112 cores
cp HPL_fullscale.dat HPL.dat
mpirun -np 112 ./xhpl | tee "$HOME"/cse6230-hw/final/fullscale.txt
```
To ensure the quality of statistics, we have run the benchmark at the same setting for five times. Below is an example of running HPL benchmark on four nodes.
```
================================================================================
HPLinpack 2.3  --  High-Performance Linpack benchmark  --   December 2, 2018
Written by A. Petitet and R. Clint Whaley,  Innovative Computing Laboratory, UTK
Modified by Piotr Luszczek, Innovative Computing Laboratory, UTK
Modified by Julien Langou, University of Colorado Denver
================================================================================

An explanation of the input/output parameters follows:
T/V    : Wall time / encoded variant.
N      : The order of the coefficient matrix A.
NB     : The partitioning blocking factor.
P      : The number of process rows.
Q      : The number of process columns.
Time   : Time in seconds to solve the linear system.
Gflops : Rate of execution for solving the linear system.

The following parameter values will be used:

N      :   19200    38400    57600    76800    96000   115200 
NB     :     192 
PMAP   : Row-major process mapping
P      :       8 
Q      :      14 
PFACT  :   Right 
NBMIN  :       4 
NDIV   :       2 
RFACT  :   Crout 
BCAST  :  1ringM 
DEPTH  :       0 
SWAP   : Mix (threshold = 64)
L1     : transposed form
U      : transposed form
EQUIL  : yes
ALIGN  : 8 double precision words

--------------------------------------------------------------------------------

- The matrix A is randomly generated for each test.
- The following scaled residual check will be computed:
      ||Ax-b||_oo / ( eps * ( || x ||_oo * || A ||_oo + || b ||_oo ) * N )
- The relative machine precision (eps) is taken to be               2.220446e-16
- Computational tests pass if scaled residuals are less than                16.0

================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4       19200   192     8    14               2.67             1.7684e+03
HPL_pdgesv() start time Wed Dec 11 16:12:52 2019

HPL_pdgesv() end time   Wed Dec 11 16:12:55 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   1.64198128e-03 ...... PASSED
================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4       38400   192     8    14              14.03             2.6908e+03
HPL_pdgesv() start time Wed Dec 11 16:12:55 2019

HPL_pdgesv() end time   Wed Dec 11 16:13:09 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   1.22453577e-03 ...... PASSED
================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4       57600   192     8    14              41.69             3.0563e+03
HPL_pdgesv() start time Wed Dec 11 16:13:10 2019

HPL_pdgesv() end time   Wed Dec 11 16:13:52 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   1.34435654e-03 ...... PASSED
================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4       76800   192     8    14              94.65             3.1905e+03
HPL_pdgesv() start time Wed Dec 11 16:13:54 2019

HPL_pdgesv() end time   Wed Dec 11 16:15:28 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   9.74225766e-04 ...... PASSED
================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4       96000   192     8    14             177.22             3.3282e+03
HPL_pdgesv() start time Wed Dec 11 16:15:31 2019

HPL_pdgesv() end time   Wed Dec 11 16:18:28 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   8.39070264e-04 ...... PASSED
================================================================================
T/V                N    NB     P     Q               Time                 Gflops
--------------------------------------------------------------------------------
WR01C2R4      115200   192     8    14             299.85             3.3992e+03
HPL_pdgesv() start time Wed Dec 11 16:18:32 2019

HPL_pdgesv() end time   Wed Dec 11 16:23:32 2019

--------------------------------------------------------------------------------
||Ax-b||_oo/(eps*(||A||_oo*||x||_oo+||b||_oo)*N)=   1.10942470e-03 ...... PASSED
================================================================================

Finished      6 tests with the following results:
              6 tests completed and passed residual checks,
              0 tests completed and failed residual checks,
              0 tests skipped because of illegal input values.
--------------------------------------------------------------------------------

End of Tests.
================================================================================
```

---
Copyright 2019 Muyang Guo

