import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import mpld3
import random
from mpld3 import plugins

np.random.seed(101)
random.seed(123)

N = 20
df = pd.DataFrame(
        (10 *
            (np.random.random((N, 2)) - 0.5)
            ).cumsum(0)
        + 10,
        columns=['a', 'b'],
        )

fig, ax = plt.subplots()
ax.grid(True, alpha = 0.3)

for key, val in df.iteritems():
    l, = ax.plot(val.index, val.values, label = key)

    ax.fill_between(val.index,
                    val.values - random.uniform(-0.01, 0.52) * 100,
                    val.values,
                    color = l.get_color(),
                    alpha = 0.4)

handles, labels = ax.get_legend_handles_labels()

interactive_legend = plugins.InteractiveLegendPlugin(
        zip(handles, ax.collections),
        labels,
        alpha_unsel = 0.5,
        alpha_over = 1.5,
        start_visible=True)

plugins.connect(fig, interactive_legend)

ax.set_xlabel('время (дни)')
ax.set_ylabel('заработок (руб * 10^3)')

mpld3.save_html(fig, "out.html")

